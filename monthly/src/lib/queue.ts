export function queue() {
  console.log('Starting going over the files in the queue');

  // Get all the unprocessed files and print it in the log.
  // Start process the file:
  //  * if something went wrong - change the status and set the error message
  //  (should be long text field)
  //  * If it's OK change the status to success.
  // In any case we need to send kafka messages about it.
}

// queue();
