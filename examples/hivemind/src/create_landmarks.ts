import { config } from "dotenv";
import { LandmarkCreate, Sara } from "sara-sdk-ts";
import fs from "fs";
import yaml from "js-yaml";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string,
);

const hivemind = new Sara.Hivemind();
if (hivemind) {
  console.log();
}

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
  throw new Error("You must pass --locality=${locality}!");
}

type YAMLType = {
  Map_id: string;
  floor: string;
  Landmarks: {
    id: number;
    virtual: boolean;
  }[];
};

let robotsData: YAMLType;

try {
  const yamlContent = fs.readFileSync(params.yamlFile, "utf8");
  robotsData = yaml.load(yamlContent) as YAMLType;
  console.log(`YAML file ${params.yamlFile} converted to JSON`);
} catch (err) {
  console.error("Error reading or parsing YAML file:", err);
  process.exit(1);
}

const floor: number = parseInt(robotsData.floor);
const mapId: string = robotsData.Map_id;

for (const landmark of robotsData.Landmarks) {
  const tag = parseInt(landmark.id.toString());
  console.log(landmark.id, floor, mapId);
  const localityServ = new hivemind.Localities(params.locality);
  const landmarkBody: LandmarkCreate = {
    name: landmark.virtual
      ? `waypoint_${landmark.id * -1}`
      : `tag_${landmark.id}`,
    floor: floor,
    tag: tag,
    mapId: mapId,
    extraFields: {},
  };

  await new localityServ.Landmarks().create(landmarkBody);

  console.log(landmarkBody);
}
