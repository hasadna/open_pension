import fs from 'fs'
import path from "path";
import request from "request";
import {
  getKafkaProcessCompletedTopic, getKafkaProcessCompletedWithErrorsTopic,
  getKafkaProcessStartedTopic,
  getStorageAddress,
  getUploadedPath
} from "./env";
import {processFileIntoDb} from "../lib/db";
import {prisma} from "../server/context";
import {KafkaClient} from "./kafka-client";

function sendMessage(kafkaClient: KafkaClient, topic: string, storageId: number) {
  const messagePayload = {
    storageId: storageId,
  };

  kafkaClient.sendMessage(JSON.stringify(messagePayload), topic)
    .then(() => {
      console.log(`The event ${topic} for the file ${storageId} has been sent.`);
    });
}

export const handleKafkaMessage = async (kafkaClient: KafkaClient, message) => {
  const { ID, filename } = message;

  if (path.extname(filename) !== '.xml') {
    console.log(`The file ${filename} was not an xml based file`);
    return;
  }

  const dest = path.join(getUploadedPath(), filename);
  const url = `${getStorageAddress()}/file/${ID}`;

  // Downloading the file.
  request(url)
    .pipe(fs.createWriteStream(dest))
    .on('error', (err) => {
      console.error(`there was an error while downloading the file ${filename}`, err);
    })
    .on('close', async () => {
      console.log(`The file, ${filename}, was created successfully.`);

      try {
        sendMessage(kafkaClient, getKafkaProcessStartedTopic(), ID);

        await processFileIntoDb(dest, prisma);
        sendMessage(kafkaClient, getKafkaProcessCompletedTopic(), ID);

        console.log(`💪 The file ${filename} was process successfully`)
      } catch (e) {
        sendMessage(kafkaClient, getKafkaProcessCompletedWithErrorsTopic(), ID);
        console.error(e);
      }
    })
};
