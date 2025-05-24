import { config } from "dotenv";
import { LandmarkType, Sara } from "sara-sdk-ts";
import fs from "fs";
import yaml from "js-yaml";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const hivemind = new Sara.Hivemind();

const args = process.argv.slice(1);

const params: { [key: string]: string } = {};

args.forEach((arg) => {
  if (arg.startsWith("--")) {
    const [key, value] = arg.slice(2).split("=");
    if (key && value) {
      params[key] = value;
    }
  }
});

if (!params.yamlFile) {
  throw new Error("You must pass --yamlFile=${yamlFile}!");
}

if (!params.locality) {
  throw new Error("You must pass --locality=${locality_slug}!");
}

let elevatorTag = 40;
let elevatorTimestamp = 50;

if (params.elevatorTag) {
  elevatorTag = parseInt(params.elevatorTag);
}

if (params.elevatorTimestamp) {
  elevatorTimestamp = parseInt(params.elevatorTimestamp);
}

type FloorValueType = {
  floor: number;
  landmarks: number[];
  timestamps: number[][];
};
type YAMLType = {
  locality: string;
  floors: {
    [key: string]: FloorValueType;
  };
};

let robotData: YAMLType;

try {
  const yamlContent = fs.readFileSync(params.yamlFile, "utf8");
  robotData = yaml.load(yamlContent) as YAMLType;
  console.log(`YAML file ${params.yamlFile} converted to JSON`);
} catch (err) {
  console.error("Error reading or parsing YAML file:", err);
  process.exit(1);
}

const landmarksPaginated = new new hivemind.Localities(
  params.locality
).Landmarks().listPaginated();

const landmarksTotal = (
  await new new hivemind.Localities(params.locality).Landmarks().list()
).count;

console.log(
  `Found ${landmarksTotal} landmarks in ${params.locality} in hivemind`
);

let landmarks: LandmarkType[] = [];
let totalCaptured = 0;

for await (const landmarksPage of landmarksPaginated) {
  totalCaptured += landmarksPage.length;
  const percent = (100 * totalCaptured) / landmarksTotal;

  console.log(`Captured ${percent.toFixed(2)}%`);
  landmarks = [...landmarks, ...landmarksPage];
}

const landmarksLength = landmarks.length;

const timestamps: number[][] = [];

const robotFloors = new Map<number, FloorValueType>();

Object.values(robotData.floors).forEach((floor) => {
  robotFloors.set(floor.floor, floor);
});

for (let i = 0; i < landmarksLength; i++) {
  timestamps.push([]);
  for (let j = 0; j < landmarksLength; j++) {
    if (i === j) {
      timestamps[i].push(0);
    } else {
      const landmarkFromTag = landmarks[i].tag;
      const landmarkFromFloor = landmarks[i].floor;
      const landmarkToTag = landmarks[j].tag;
      const landmarkToFloor = landmarks[j].floor;

      const landmarkFromIndex = robotFloors
        .get(landmarkFromFloor)
        ?.landmarks.indexOf(landmarkFromTag);

      const landmarkToIndex = robotFloors
        .get(landmarkToFloor)
        ?.landmarks.indexOf(landmarkToTag);

      if (
        landmarkFromIndex !== undefined &&
        landmarkToIndex !== undefined &&
        landmarkFromIndex !== -1 &&
        landmarkToIndex !== -1
      ) {
        if (landmarkFromFloor !== landmarkToFloor) {
          // If the landmarks are on different floors, we assume no direct connection
          const elevatorFromIndex = robotFloors
            .get(landmarkFromFloor)
            ?.landmarks.indexOf(elevatorTag);
          const elevatorToIndex = robotFloors
            .get(landmarkToFloor)
            ?.landmarks.indexOf(elevatorTag);
          if (
            elevatorFromIndex !== undefined &&
            elevatorToIndex !== undefined &&
            elevatorFromIndex !== -1 &&
            elevatorToIndex !== -1
          ) {
            // timestamp for landmarkFromIndex to elevatorFromIndex
            const timestampFrom =
              robotFloors.get(landmarkFromFloor)?.timestamps[landmarkFromIndex][
                elevatorFromIndex
              ];
            // timestamp for elevatorToIndex to landmarkToIndex
            const timestampTo =
              robotFloors.get(landmarkToFloor)?.timestamps[elevatorToIndex][
                landmarkToIndex
              ];
            if (timestampFrom !== undefined && timestampTo !== undefined) {
              // Calculate the total timestamp
              const totalTimestamp =
                timestampFrom + elevatorTimestamp + timestampTo;
              timestamps[i].push(totalTimestamp);
            } else {
              console.warn(
                `No timestamp found for landmarks ${landmarkFromTag} and ${landmarkToTag} on floors ${landmarkFromFloor} and ${landmarkToFloor}`
              );
              timestamps[i].push(0);
            }
          } else {
            console.warn(
              `No landmark elevator found for ${elevatorTag} on floors ${landmarkFromFloor} or ${landmarkToFloor}`
            );
            timestamps[i].push(0);
          }
        } else {
          // If the landmarks are on the same floor, we assume a direct connection
          const timestamp =
            robotFloors.get(landmarkFromFloor)?.timestamps[landmarkFromIndex][
              landmarkToIndex
            ];
          if (timestamp !== undefined) {
            timestamps[i].push(timestamp);
          } else {
            console.warn(
              `No timestamp found for landmarks ${landmarkFromTag} and ${landmarkToTag} on floor ${landmarkFromFloor}`
            );
            timestamps[i].push(0);
          }
        }
      } else {
        timestamps[i].push(0);
      }
    }
  }
}

console.log(
  "[\n" +
    timestamps.map((timestamp) => " " + JSON.stringify(timestamp)).join(",\n") +
    "\n]"
);
