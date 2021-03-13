import {processFile} from "./lib/file";
// import {prisma} from "./server/context";
// import {processFileIntoDb} from "./lib/db";
(async () => {
  const foo = await processFile('/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/gemelnet_2017_01_perut.xml');

  console.log(foo);
})()
