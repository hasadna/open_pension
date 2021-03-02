// import {processFile} from "./lib/file";
// import {prisma} from "./server/context";
// import {processFileIntoDb} from "./lib/db";

import {queue} from "./lib/queue";

/**
 * There should be a change in the flow:
 * When getting a file message we need to store it with a 'new' status.
 *
 * A queue will go over the files:
 *  * If it's manage to process the file, store the results and change the status of the file.
 *  * If it's failed to process the file and change the status of the file.
 *
 * In any case, send message for failing or success. Later on.
 *
 * Also, we need to update the tests and update the graphql schema.
 */
queue();

// import {storeFile} from "./lib/file";
//
// // storeFile('512237744_psum_0219_1614018591432374913.xlsx', 1, null);
// storeFile('pensyanet_2017_01_maslul_klali_161402523762700.xml', 12, null);
// // // const path = '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/gemelnet_2017_01_perut.xml';
// // // // processFile(path).then((results) => {
// // // //   console.log(results);
// // // }).catch(e => {
// // //   console.error(e);
// // // });
// //
// // processFileIntoDb(path, prisma).then((res) => {
// //   console.log(res);
// // }).catch((e) => {
// //   console.log(e)
// // })
