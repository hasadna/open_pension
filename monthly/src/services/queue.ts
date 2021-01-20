import fs from 'fs'
import path from "path";
import request from "request";
import {getStorageAddress, getUploadedPath} from "./env";
import {processFileIntoDb} from "../lib/db";
import {prisma} from "../server/context";

export const handleKafkaMessage = async (message) => {
  const { ID, filename } = message;

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
        await processFileIntoDb(dest, prisma);
        console.log(`💪 The file ${filename} was process successfully`)
      } catch (e) {
        console.error(e);
      }
    })
};
