import {getFile, updateFile, Status} from "../db/file";

const topicsStatus = {
  'FileStored': Status.stored,
  'fileStoredByService': Status.storedByService,
  'processingStarted': Status.processStarted,
  'processedWithErrors': Status.processedWithError,
  'processed': Status.processed,
};

export async function handleKafkaEvent(topic, message) {
  const storageId = topic === 'FileStored' ? message.ID : message.storageId;
  const {collections} = await getFile({conditions: {storageId}});
  await updateFile(collections[0]._id, {status: topicsStatus[topic]})
}
