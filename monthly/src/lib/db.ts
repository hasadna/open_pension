import {PrismaClient} from "@prisma/client"
import {isEmpty} from "lodash";
import {File, FileStatus, ProcessState} from "./interfaces";
import {processFile} from "./file";
import {log} from 'open-pension-logger';

async function updateFileStatus(file: File, status: FileStatus, prisma: PrismaClient, error = null) {
  let data: object = {};
  if (status == FileStatus.Failed) {
    data = {status, error}
  }
  else {
    data = {status, error: ""};
  }

  // We failed, we need to update the file in the DB.
  await prisma.file.update({
    where: {ID: file.ID},
    data,
  });
}

export async function processFilesToRows(file: File, prisma: PrismaClient): Promise<ProcessState> {
  const {status, payload, message: error} = await processFile(file.path);

  if (!isEmpty(payload)) {
    await log(`Inserting the results for ${file.filename} to the DB.`)

    const baseData: any = {
      file: {connect: { ID: file.ID } },
      created: new Date(),
    };

    try {
      await Promise.all(payload.map(async (processedFileRow) => {
        const combined = {...baseData, ...processedFileRow};
        // @ts-ignore
        await prisma.row.create({data: combined});
      }));
    } catch (e) {
      log(`Failed parsing the file ${file.filename} with the error: ${String(e)}`, 'error')
    }
  } else {
    log(`There are no rows for the file ${file.filename}. Update the file as success anyway.`, 'warning');
  }

  const newFileStatus = status == ProcessState.Failed ? FileStatus.Failed : FileStatus.Succeeded;
  await updateFileStatus(file, newFileStatus, prisma, error);
  return status;
}
