import {Status, updateFileStatus} from "./db/file";

(async () => {

  // const {collections} = await getFile({conditions: {storageId: 142}});
  await updateFileStatus(156, Status.processedWithError);

  // const [{_id}] = await collections.exec();
  // const results = await updateFile(_id, {filename: 'pizza.png'});
  // console.log(results);
})();


