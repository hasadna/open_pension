import {PrismaClient} from "@prisma/client"
import {basename} from "path"
import {processFile} from "./file";
import {ProcessState} from "./interfaces";

export async function processFileIntoDb(path: string, prisma: PrismaClient) {
  const {status, payload, message} = await processFile(path);

  console.log({status, payload, message})

  const fileName = basename(path);

  const baseData: any = {
    filename: fileName,
    created: new Date(),
  };

  if (status == ProcessState.Failed) {
    baseData.status = 'Failed';
    baseData.message = message;
  } else {
    baseData.status = 'Succeeded';
    payload.map(async (processedFileRow) => {
      const combined = {...baseData, ...processedFileRow};

      // @ts-ignore
      await prisma.parsedFiles.create({data: combined});
    });
  }
}
