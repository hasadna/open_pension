import fs from 'fs'
import path from "path";
import request from "request";
import {getStorageAddress, getUploadedPath} from "./env";
import {FileModel, StatusNew} from "../db/FileModel";

export const handleKafkaMessage = async (message) => {
  const { ID, filename } = message;

  if (path.extname(filename) === '.xml') {
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
    .on('close', () => {
      console.log(`The file, ${filename}, was created successfully.`);
    })

  // Create an entry in the DB with an unprocessed status.
  const fileData = {
    filename,
    'status': StatusNew,
    storageId: ID
  };

  await new FileModel(fileData).save();
};

export const queueHandle = (fileObject) => {
  // Call the process single sheet.
}
