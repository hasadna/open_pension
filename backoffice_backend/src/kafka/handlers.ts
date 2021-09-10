import {getFile, updateFile, Status, createFile} from "../db/file";
import {isEmpty} from 'lodash';
import {log} from "open-pension-logger";
import {getFilenameFromStorage} from "../utils/file";

const topicsStatus = {
  'FileStored': Status.stored,
  'fileStoredByService': Status.storedByService,
  'processingStarted': Status.processStarted,
  'processedWithErrors': Status.processedWithError,
  'processed': Status.processed,
};

export async function handleKafkaEvent(topic, message) {
  log(`Listen to the log messages: ${JSON.stringify({topic, message})}`);
  const storageId = topic === 'FileStored' ? message.ID : message.storageId;
  const {collections} = await getFile({conditions: {storageId}});
  const status = topicsStatus[topic];

  if (isEmpty(collections)) {
    const filename = await getFilenameFromStorage(storageId)
    await createFile({status, filename, storageId});

    log(`The record for the file ${filename} has been created with the status ${status}`)
  } else {
    await updateFile(collections[0]._id, {status})
    log(`The record for the file ${collections[0].filename} has been updated with the status ${status}`)
  }
}
