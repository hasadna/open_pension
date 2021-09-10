import {getFilenameFromStorage} from "./utils/file";

(async () => {
  const results = await getFilenameFromStorage(7);

  console.log(results);

})();


