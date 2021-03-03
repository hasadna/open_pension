import {PrismaClient} from "@prisma/client"
import {isEmpty} from "lodash";

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

  if (!isEmpty(payload)) {
    console.log(`Inset the results for ${file.filename} to the DB.`);

    const baseData: any = {
      fileId: file.id,
      created: new Date(),
    };

    await Promise.all(payload.map(async (processedFileRow) => {
      const combined = {...baseData, ...processedFileRow};

      // @ts-ignore
      await prisma.rows.create({data: combined});
    }));

    console.log(`Done creating rows for the file ${file.filename}.`)
  } else {
    console.log(`There are now rows for the file ${file.filename}. Update the file as success anyway.`);
  }

  await prisma.file.update({
    where: {id: file.id},
    data: {status: FileStatus.Succeeded},
  });

  return FileStatus.Succeeded;
}
