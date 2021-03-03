import {prisma} from "../server/context";
import {isEmpty} from "lodash";
import {processFilesToRows} from "./db";
import {File} from "./interfaces";
import {KafkaClient} from "../services/kafka-client";
import {getKafkaProcessStartedTopic} from "../services/env";

const fileToProcessEachQueue = 5;

export async function queue() {
  const kafkaClient = new KafkaClient();

  const files: any = await prisma.file.findMany({
    where: {status: 'Ready'},
    take: fileToProcessEachQueue,
    orderBy: {created: 'asc'}
  });

  if (isEmpty(files)) {
    return console.log('There are no files to process');
  }

  const numberOfFiles = files.length;
  console.log(`There are ${numberOfFiles} file(s) to process. Starting to process them`);

  await Promise.all(files.map(async (file: File) => {
    console.log(`Processing the file ${file.id} - ${file.filename}`);

    // Sending the event for starting the processing.
    await kafkaClient.sendMessage(
      KafkaClient.getPayloadByStorageId(file.storageID),
      getKafkaProcessStartedTopic()
    );

    await processFilesToRows(file, prisma, kafkaClient);
  }));

  console.log(`Done processing ${numberOfFiles} file(s).`);
}

queue();
