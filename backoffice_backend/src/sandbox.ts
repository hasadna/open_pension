import {getObject, Operation} from "./db/Utils";
import {File} from "./db/file";

(async () => {
  const results = await getObject(File, {}, {itemsNumber: 1}, [
    {key: "filename", value: "foo", operation: Operation.CONTAINS},
    {key: "storageId", value: 42}
  ]);
  console.log(results);
})();


