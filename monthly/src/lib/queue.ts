import {prisma} from "../server/context";
import {isEmpty} from "lodash";
import {processFilesToRows} from "./db";
import {File, ProcessState} from "./interfaces";
import {KafkaClient} from "../services/kafka-client";
import {
  getKafkaProcessCompletedTopic, getKafkaProcessCompletedWithErrorsTopic,
  getKafkaProcessStartedTopic
} from "../services/env";
import {log} from 'open-pension-logger'

const fileToProcessEachQueue = 5;

export async function queue() {

  const kafkaClient = new KafkaClient();

  const files: any = await prisma.file.findMany({
    where: {status: 'Ready'},
    take: fileToProcessEachQueue,
    orderBy: {created: 'asc'}
  });

  if (isEmpty(files)) {
    log({text: 'There are no files to process'});
  } else {
    const numberOfFiles = files.length;
    log({text: `There are ${numberOfFiles} file(s) to process. Starting to process them`});

    await Promise.all(files.map(async (file: File) => {
      log({text: `Processing the file ${file.ID} - ${file.filename}`});

      // Sending the event for starting the processing.
      if (kafkaClient.serviceUp) {
        await kafkaClient.sendMessage(
          KafkaClient.getPayloadByStorageId(file.storageID),
          getKafkaProcessStartedTopic()
        );
      }

      const status = await processFilesToRows(file, prisma);

      if (kafkaClient.serviceUp) {
        const topic = status == ProcessState.Success ?
          getKafkaProcessCompletedTopic() :
          getKafkaProcessCompletedWithErrorsTopic();

        const payload = KafkaClient.getPayloadByStorageId(file.storageID);

        log({text: `sending kafka event: ${JSON.stringify({topic, payload})}`});
        await kafkaClient.sendMessage(
          payload,
          topic
        );
      }
    }));

    log({text: `Done processing ${numberOfFiles} file(s).`});
  }
}

queue().then(() => {
  log({text: `Done processing files at ${new Date()}`});
  prisma.$disconnect()
  process.exit(0);
}).catch((error) => {
  prisma.$disconnect()
  log({text: 'An error occurred while processing the files', error}, 'error')
  process.exit(1);
});
