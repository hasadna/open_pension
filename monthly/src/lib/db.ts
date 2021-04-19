import {PrismaClient} from "@prisma/client"
import {isEmpty} from "lodash";
import {File, FileStatus, ProcessState} from "./interfaces";
import {processFile} from "./file";
import {KafkaClient} from "../services/kafka-client";
import {
  getKafkaProcessCompletedTopic,
  getKafkaProcessCompletedWithErrorsTopic
} from "../services/env";

async function updateFileStatus(file: File, status: FileStatus, prisma: PrismaClient, kafkaClient: KafkaClient, error = null) {
  let topic: string = '';
  let data: object = {};
  if (status == FileStatus.Failed) {
    topic = getKafkaProcessCompletedWithErrorsTopic();
    console.log(`We failed processing the file ${file.filename} at ${new Date()}`);
    data = {status, error}
  }
  else {
    topic = getKafkaProcessCompletedTopic();
    console.log(`Done creating rows for the file ${file.filename}.`);
    data = {status};
  }

  // We failed, we need to update the file in the DB.
  await prisma.file.update({
    where: {id: file.id},
    data,
  });

  // Sending the event for starting the processing.
  await kafkaClient.sendMessage(KafkaClient.getPayloadByStorageId(file.storageID), topic);
  return status;
}

export async function processFilesToRows(file: File, prisma: PrismaClient, kafkaClient: KafkaClient) {
  const {status, payload, message: error} = await processFile(file.path);

  if (status == ProcessState.Failed) {
    return updateFileStatus(file, FileStatus.Failed, prisma, kafkaClient, error);
  }

  if (!isEmpty(payload)) {
    console.log(`Inserting the results for ${file.filename} to the DB.`);

    const baseData: any = {
      fileId: file.id,
      created: new Date(),
    };

    try {
      await Promise.all(payload.map(async (processedFileRow) => {
        const combined = {...baseData, ...processedFileRow};
        // @ts-ignore
        await prisma.row.create({data: combined});
      }));

      return updateFileStatus(file, FileStatus.Succeeded, prisma, kafkaClient);

    } catch (e) {
      console.log(`Failed parsing the file ${file.filename} with the error: ${String(e)}`)
      return await updateFileStatus(file, FileStatus.Failed, prisma, kafkaClient, String(e));
    }

  } else {
    console.log(`There are now rows for the file ${file.filename}. Update the file as success anyway.`);
  }

  return null;
}
