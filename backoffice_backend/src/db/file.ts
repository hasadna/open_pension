import {
  BaseEntity,
  createObject, GetEntityArguments, getObject,
  // GetEntityArguments, getObject,
  TransactionResults, updateObject
} from './Utils';
import mongoose from './db';

export type FileInterface = BaseEntity & {
  readonly filename: string,
  readonly storageId?: number,
  readonly status: Status,
  readonly createdAt?: Date,
  readonly updatedAt?: Date,
};

export enum Status {
  sent = 'sent',
  stored = 'stored',
  processed = 'processed',
  processedWithError = 'processedWithError',
}

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  storageId: {type: Number, unique: true},
  status: {type: String, required: true, enum: Status},
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const File = mongoose.model('files', fileSchema);

/**
 * Loading a file from the DB by id or condition.
 *
 * @param {string} id - The id of the file.
 * @param {Conditions} conditions - the conditions to filter the files by.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getFile({id, conditions}: GetEntityArguments) {
  return getObject(File, {id, conditions});
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
  await File.findOneAndUpdate({storageId}, {status});
}

export async function updateFile(id, newValues) {
  return await updateObject(File, id, newValues);
}
