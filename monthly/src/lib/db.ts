import { PrismaClient } from "@prisma/client"
import { basename } from "path"
import { processFile } from "./file";

export async function processFileIntoDb(path: string, prisma: PrismaClient) {
  const processedFileRows = await processFile(path);

  if (!processedFileRows) {
    console.error(`There was an error while processing the file.`);
    return;
  }

  const fileName = basename(path);

  const baseData = {
    filename: fileName,
    created: new Date(),
  };

  processedFileRows.map(async (processedFileRow) => {
    const combined = {...baseData, ...processedFileRow};
    await prisma.parsedFiles.create({data: combined});
  });
}
