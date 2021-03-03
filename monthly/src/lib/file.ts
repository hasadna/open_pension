import fs from 'fs'
import path from "path";
import request from "request";
import {existsSync, readFileSync} from "fs";
import {parseStringPromise} from "xml2js";
import {basename} from "path"
import {parsers} from "./parsers";
import {prisma} from "../server/context";
import {KafkaClient} from "../services/kafka-client";
import {
  InfoReturnInterface,
  ProcessedBituachXmlFileInterface,
  ProcessResults,
  ProcessState
} from "./interfaces";

import {
  getKafkaFileStoredByService,
  getStorageAddress,
  getUploadedPath
} from "../services/env";

/**
 * Saving the file to the local disk and save it later for processing.
 *
 * @param {string} filename - The file name from the storage service.
 * @param {any} ID - The ID of the file from the storage service.
 * @param {KafkaClient} kafkaClient - The kafka client service.
 */
export function storeFile(filename: string, ID: any, kafkaClient: KafkaClient) {
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
      console.log(`The file, ${filename}, was created successfully in ${dest}.`);

      const data = {
        filename,
        storageID: ID,
        path: dest,
        error: "",
        status: 'Ready',
      };

      // @ts-ignore
      const file = await prisma.file.create({data: data});

      console.log(`The file ${filename} was created to the DB with the id ${file.id}`);

      if (kafkaClient !== null) {
        await kafkaClient.sendMessage({storageId: ID}, getKafkaFileStoredByService());
      }
    });
}

/**
 * Reading a file and return the raw object.
 *
 * @param path
 *   The path of the file.
 */
export async function readFile(path: string): Promise<InfoReturnInterface> {
  if (!existsSync(path)) {
    return {
      status: false,
      message: 'The file does not exists',
    };
  }

  const results = readFileSync(path, 'utf-8');

  try {
    const processedXmlFile: ProcessedBituachXmlFileInterface = await parseStringPromise(results);

    return {
      status: true,
      message: 'file processed',
      payload: processedXmlFile
    };
  } catch (e) {
    return {
      status: false,
      message: 'The file is not an xml file',
    };
  }
}

/**
 * Process a single file.
 *
 * @param path
 *  The path of the file to process.
 */
export async function processFile(path: string): Promise<ProcessResults> {
  const {status, payload, message} = await readFile(path);

  if (!status) {
    return {
      status: ProcessState.Failed,
      payload: [],
      message
    };
  }

  const fileName = basename(path);
  const parser = Object.keys(parsers).find(parser => fileName.includes(parser));

  if (!parser) {
    return {
      status: ProcessState.Failed,
      payload: [],
      message: `There is no matching processor for the file ${fileName}`
    }
  }

  const handler = parsers[parser];

  try {
    const results = await handler(payload);
    return {
      status: ProcessState.Success,
      payload: results,
      message: null,
    };
  } catch (e) {
    return {
      status: ProcessState.Failed,
      payload: [],
      message: e.message
    };
  }
}
