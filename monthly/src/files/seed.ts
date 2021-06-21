import {join} from "path";
import {readdirSync} from "fs";
import {chunk} from "lodash";
import {prisma} from "../server/context";
import {processFilesToRows} from "../lib/db";

export async function seedDummyFiles() {
  const baseFilesPath = join(process.cwd(), 'src', 'files', 'dummy_files');
  const files = readdirSync(join(baseFilesPath));

  const fileChunks = chunk(files, 10);

  const filesModels = [];

  console.log('Start reading files');
  for (let fileChunk of fileChunks) {
    await Promise.all(fileChunk.map(async (filename: string) => {
      const data = {
        filename: filename,
        storageID: 0,
        path: join(baseFilesPath, filename),
        error: "",
        status: 'Ready',
      };

      // @ts-ignore
      const file = await prisma.file.create({data: data});

      filesModels.push(file);

      console.log(`Create file ${filename} with the ID ${file.ID}`)
    }));
  }

  console.log('Done reading file, handle process');

  const modelChunks = chunk(filesModels, 20);
  for (let modelChunk of modelChunks) {
    await Promise.all(modelChunk.map(model => processFilesToRows(model, prisma)));
  }

  console.log('Done proessing results');
}

seedDummyFiles()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

