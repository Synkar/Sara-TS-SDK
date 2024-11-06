import { config } from "dotenv";
import { LandmarkType, Sara } from "sara-sdk-ts";
let data = "";

// Escuta o evento 'data' para capturar o conteúdo do pipe em partes
process.stdin.on("data", (chunk) => {
  data += chunk;
});
type TypeFile = {
  locality: string;
  landmarks: LandmarkType[];
};
const file = await new Promise<TypeFile>((resolve, reject) => {
  process.stdin.on("end", () => {
    try {
      // Aqui você pode tratar o conteúdo como quiser; Exemplo: JSON.parse(data) se for JSON
      console.log("Conteúdo do arquivo capturado via pipe");

      resolve(JSON.parse(data) as TypeFile);
    } catch (error) {
      console.error("Erro ao processar o conteúdo:", error);
      reject(error);
    }
  });
});

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

let totalUpdated = 0;
const hivemind = new Sara.Hivemind();
const landmarkHelper = new new hivemind.Localities(file.locality).Landmarks();

for (const landmark of file.landmarks) {
  await landmarkHelper.update(landmark.uuid, { tag: -1 * landmark.tag });
  totalUpdated++;
  const percent = (100 * totalUpdated) / file.landmarks.length;
  console.log(`Updated ${percent.toFixed(2)}`);
}
