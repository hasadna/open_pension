import {getFile} from "./db/file";

(async () => {

  const {collections} = await getFile({conditions: {storageId: 85}});
  const files = await collections.exec();
  console.log(files[0]._id);
})();


