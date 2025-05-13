import { config } from "dotenv";
import { Sara } from "sara-sdk-ts";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const iamService = new Sara.IAM();
const usersService = new iamService.Users();
console.log(await usersService.me());

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

const robotsService = new iamService.Robots();

const columns = [
  ["0d9194fc-dc3a-4c75-af5d-0bd8537841ac", "sp_osasco_if", "144"],
  ["0d9194fc-dc3a-4c75-af5d-0bd8537841ac", "sp_ribeirao_sy", "13"],
];

const robotNames = new Map<string, string>();

for (const col of columns) {
  const robotUuid = col[0] as string;
  let robotName = "";
  if (!robotNames.get(robotUuid)) {
    const robot = await robotsService.retrieve(col[0] as string);
    robotName = robot.name;
    robotNames.set(robotUuid, robotName);
    console.log("fetched " + robotName);
  } else {
    robotName = robotNames.get(robotUuid) as string;
  }

  col.push(robotName);
}
console.log('"robotUuid";"robotName";"localitySlug";"count"');
console.log(
  columns
    .map((col) => `\"${col[0]}\";\"${col[3]}\";\"${col[1]}\";\"${col[2]}\"`)
    .join("\n")
);
