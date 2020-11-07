import {FileModel, StatusNew} from "./db/FileModel";
import {processingFile} from "./server/process";

FileModel
  .find( { status: { $eq: StatusNew }})
  .limit(50)
  .then(async (files) => {
    if (files.length === 0) {
      console.log('No files to process');
      return;
    }

    console.log(`Starting to process ${files.length} files`);

    await Promise.all(files.map(async (file) => {
      await processingFile(file);
    }));

    console.log('Done processing files.');
  });
