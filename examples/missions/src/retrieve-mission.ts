import { config } from "dotenv";
import { Sara } from "sara-sdk-ts";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const missionsService = new Sara.Missions();

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

if (!params.missionUuid) {
  throw new Error("You must pass --missionUuid=${missionUuid}");
}

const mission = await missionsService.retrieve(params.missionUuid);

console.log(mission);
