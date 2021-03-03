import {prisma} from "../server/context";
import {isEmpty} from "lodash";

const fileToProcessEachQueue = 5;

export async function queue() {
  const files = await prisma.file.findMany({
    where: {status: 'Ready'},
    take: fileToProcessEachQueue,
    orderBy: {created: 'asc'}
  });

  if (isEmpty(files)) {
    return console.log('There are no files to process');
  }

  const numberOfFiles = files.length;
  console.log(`There are ${numberOfFiles} file(s) to process. Starting to process them`);

  await Promise.all(files.map(async (file) => {
    console.log(file.id);
  }));

  console.log(`Done processing ${numberOfFiles} file(s).`)


  // Get all the unprocessed files and print it in the log.
  // Start process the file:
  //  * if something went wrong - change the status and set the error message
  //  (should be long text field)
  //  * If it's OK change the status to success.
  // In any case we need to send kafka messages about it.
}

// queue();
