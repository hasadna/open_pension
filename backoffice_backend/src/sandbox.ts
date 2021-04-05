import { createFile, Status } from './db/file';

(async () => {
  await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});
})();


