import {existsSync, readFileSync} from "fs";
import {basename} from "path"
import {
  InfoReturnInterface,
  ProcessedBituachXmlFileInterface,
  ProcessResults,
  ProcessState
} from "./interfaces";
import {parseStringPromise} from "xml2js";
import {parsers} from "./parsers";

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
    const results = handler(payload);
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
