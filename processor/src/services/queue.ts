import fs from 'fs'
import path from "path";
import request from "request";
import {getStorageAddress, getUploadedPath} from "./env";

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
    .on('close', (res) => {
      console.log(`The file, ${filename}, was created successfully.`);
    })

  // 2. Create an entry in the DB with an unprocessed status.
};

export const queueHandle = (fileObject) => {
  // Call the process single sheet.
}
