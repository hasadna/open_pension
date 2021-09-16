import {
  BaseEntity,
  createObject, Filter, GetEntityArguments, getObject, Pagination,
  TransactionResults, updateObject
} from './Utils';
import mongoose from './db';
import {prepareDocumentToPusherEvent, sendEvent} from "../utils/pusher";
import axios from "axios";
import {getMonthlyAddress} from "../utils/config";

export type FileInterface = BaseEntity & {
  readonly filename: string,
  readonly storageId?: number,
  readonly status: Status,
  readonly extra?: object,
  readonly createdAt?: Date,
  readonly updatedAt?: Date,
};

export enum Status {
  sent = 'sent',
  stored = 'stored',
  storedByService = 'storedByService',
  processStarted = 'processStarted',
  processed = 'processed',
  processedWithError = 'processedWithError',
}

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  storageId: {type: Number, unique: true},
  error: {type: String, required: false},
  status: {type: String, required: true, enum: Status},
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  extra: { type: Object, required: false }
});

export const File = mongoose.model('files', fileSchema);

/**
 * Loading a file from the DB by id or condition.
 *
 * @param {string} id - The id of the file.
 * @param {Conditions} conditions - The conditions to filter the files by.
 * @param {Pagination} pagination - pagination for the items.
 * @param {Filter} filter - The filter params passed from GraphQL.
 * @param {boolean} withTotalCount - Determine if we need to return just the
 *  items or including the count. Should be removed once all the models line up
 *  with the new format.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getFile({id, conditions}: GetEntityArguments, pagination: Pagination = {}, filter: Filter[] = []) {
  const {collections, totalCount} = await getObject(File, {id, conditions}, pagination, filter);
  return {collections, totalCount};
}

/**
 * Creating a file.
 *
 * @param file - The file object.
 */
export async function createFile(file: FileInterface): Promise<TransactionResults> {
  return await createObject(File, file);
}

/**
 * Update the file status.
 *
 * @param storageId - The storage ID.
 * @param status - The new status of the file.
 */
export async function updateFileStatus(storageId: number, status: Status) {
  // @ts-ignore
  const document = await File.findOneAndUpdate({storageId}, {status}, {new: true});
  await sendEvent('main', 'objectUpdate', prepareDocumentToPusherEvent(document, 'files'));
}

/**
 * Updating a file.
 *
 * @param id - The ID of the file.
 * @param newValues - The new values of the file.
 */
export async function updateFile(id, newValues) {
  return await updateObject(File, id, newValues);
}

export async function getFileMetadata(storageId: number) {
  const query = `
      query {
        fileInfo(storageID: ${storageId}) {
          error,
          numberOfRows,
           fileRows {
            row_ID
            MANAGER_ID
            ALPHA_SHNATI
            SHARP_RIBIT_HASRAT_SIKUN
            STIAT_TEKEN_60_HODASHIM
            STIAT_TEKEN_36_HODASHIM
            TSUA_SHNATIT_MEMUZAAT_5_SHANIM
            TSUA_SHNATIT_MEMUZAAT_3_SHANIM
            TSUA_MITZTABERET_60_HODASHIM
            TSUA_MITZTABERET_36_HODASHIM
            TSUA_MEMUZAAT_60_HODASHIM
            TSUA_MEMUZAAT_36_HODASHIM
            TSUA_MITZT_MI_THILAT_SHANA
            YITRAT_NCHASIM_LSOF_TKUFA
            TSUA_NOMINALIT_BRUTO_HODSHIT
            TKUFAT_DIVUACH
            missingReclamationData
            managerMetadata {
              status
              channel
              subChannel
              fundName
              type
              passiveActive
              homebase
              managingBody
            }
          }
        }
      }
    `

  const axiosInstance = axios.create({
    baseURL: getMonthlyAddress(),
  });

  const {data: {data: {fileInfo}}} = await axiosInstance.post('/graphql', {
    query
  });

  return fileInfo;
}
