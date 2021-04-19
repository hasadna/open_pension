// import {prisma} from "./server/context";
import {queue} from "./lib/queue";

(async () => {

  // const data = {
  //   filename: 'foo.xml',
  //   storageID: 20,
  //   path: '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/bituachnet_2017_01_type0.xml',
  //   error: "",
  //   status: 'Ready',
  // };
  //
  // // @ts-ignore
  // const file = await prisma.file.create({data: data});
  await queue();


})()
