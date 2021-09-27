import {join} from "path";
import {readdirSync} from "fs";
import {chunk} from "lodash";
import {prisma} from "../server/context";
import {processFilesToRows} from "../lib/db";
import {log} from 'open-pension-logger';

export async function seedDummyFiles() {
  const baseFilesPath = join(process.cwd(), 'src', 'files', 'dummy_files');
  const files = readdirSync(join(baseFilesPath));

  const fileChunks = chunk(files, 10);

  const filesModels = [];

  log({text: 'Start reading files'});
  for (let fileChunk of fileChunks) {
    await Promise.all(fileChunk.map(async (filename: string) => {
      const data = {
        filename: filename,
        storageID: 0,
        path: join(baseFilesPath, filename),
        error: "",
        status: 'Ready',
      };

      // Applying the ts-ignore due to unknown model name and typescript has
      // some issues with that.
      // @ts-ignore
      const file = await prisma.file.create({data: data});

      filesModels.push(file);

      log({text: `Create file ${filename} with the ID ${file.ID}`})
    }));
  }

  log({text: 'Done reading file, handle process'});

  const modelChunks = chunk(filesModels, 20);
  for (let modelChunk of modelChunks) {
    await Promise.all(modelChunk.map(model => processFilesToRows(model, prisma)));
  }

  log({text: 'Done processing results'});
}

seedDummyFiles()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

