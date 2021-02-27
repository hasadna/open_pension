import {PrismaClient} from "@prisma/client"
import {basename} from "path"
import {processFile} from "./file";
import {ProcessState} from "./interfaces";

export async function processFileIntoDb(path: string, prisma: PrismaClient) {
  const {status, payload} = await processFile(path);

  if (status == ProcessState.Failed) {
    // todo: set the status of the file as failed.
    console.error(`There was an error while processing the file.`);
    return;
  }

  const fileName = basename(path);

  const baseData = {
    filename: fileName,
    created: new Date(),
  };

  payload.map(async (processedFileRow) => {
    const combined = {...baseData, ...processedFileRow};
    await prisma.parsedFiles.create({data: combined});
  });
}
