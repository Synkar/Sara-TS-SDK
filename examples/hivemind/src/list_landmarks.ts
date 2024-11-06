import { config } from "dotenv";
import { LandmarkType, Sara } from "sara-sdk-ts";
import * as fs from "fs";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const hivemind = new Sara.Hivemind();

const args = process.argv.slice(1);

const params: { [key: string]: string } = {};

// Percorre os argumentos e armazena-os em um objeto
args.forEach((arg) => {
  if (arg.startsWith("--")) {
    const [key, value] = arg.slice(2).split("="); // Remove '--' do início e separa chave e valor
    if (key && value) {
      params[key] = value;
    }
  }
});

if (!params.locality) {
  throw new Error("You must pass --locality=${locality_slug}!");
}

const landmarksPaginated = new new hivemind.Localities(
  params.locality
).Landmarks().listPaginated();

const landmarksTotal = (
  await new new hivemind.Localities(params.locality).Landmarks().list()
).count;

let landmarks: LandmarkType[] = [];

console.log(`Capituring all ${landmarksTotal} landmarks...`);

let totalCaptured = 0;

for await (const landmarksPage of landmarksPaginated) {
  totalCaptured += landmarksPage.length;
  const percent = (100 * totalCaptured) / landmarksTotal;

  console.log(`Captured ${percent.toFixed(2)}%`);
  landmarks = [...landmarks, ...landmarksPage];
}

if (params.outputFile) {
  console.log(`Saving at ${params.outputFile}.`);
  try {
    fs.writeFileSync(
      params.outputFile,
      JSON.stringify({ locality: params.locality, landmarks }, null, 2),
      "utf-8"
    );
    console.log("Saved successfully!");
  } catch (error) {
    console.error("Error saving file:", error);
  }
}
