import {getFile, updateFile, Status} from "../db/file";

const topicsStatus = {
  'FileStored': Status.stored,
  'fileStoredByService': Status.storedByService,
  'processingStarted': Status.processStarted,
  'processingCompletedWithErrors': Status.processedWithError,
  'processingCompleted': Status.processed,
};

export async function handleKafkaEvent(topic, message) {
  const storageId = topic === 'FileStored' ? message.id : message.storageId;
  console.log(storageId);
  const {collections} = await getFile({conditions: {storageId}});

  const files = await collections.exec();
  await updateFile(files[0]._id, {status: topicsStatus[topic]})
}
