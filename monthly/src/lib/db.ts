import {PrismaClient} from "@prisma/client"
// import {basename} from "path"
// import {processFile} from "./file";
// import {ProcessState} from "./interfaces";
// import {processFile} from "./file";

import {File, FileStatus, ProcessState} from "./interfaces";
import {processFile} from "./file";

export async function processFilesToRows(file: File, prisma: PrismaClient) {
  const {status, payload, message} = await processFile(file.path);

  if (status == ProcessState.Failed) {
    console.log(`We failed processing the file ${file.filename} at ${new Date()}`)
    // We failed, we need to update the file in the DB.
    await prisma.file.update({
      where: {id: file.id},
      data: {status: FileStatus.Failed, error: message},
    });

    return FileStatus.Failed;
  }

  console.log(payload);

  return FileStatus.Succeeded;
  // const baseData: any = {
  //   filename: fileName,
  //   created: new Date(),
  // };
  //
  // if (status == ProcessState.Failed) {
  //   baseData.status = 'Failed';
  //   baseData.message = message;
  // } else {
  //   baseData.status = 'Succeeded';
  //   payload.map(async (processedFileRow) => {
  //     const combined = {...baseData, ...processedFileRow};
  //
  //     // @ts-ignore
  //     await prisma.parsedFiles.create({data: combined});
  //   });
  // }
}
