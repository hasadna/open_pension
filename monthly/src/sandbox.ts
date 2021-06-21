// import {prisma} from "./server/context";
import {seedDummyFiles} from "./files/seed";

(async () => {

  seedDummyFiles()

  // todo:
  //  1. call the queue.
  //  2. Create a seed for the real records as well.
  // const data = {
  //   filename: "pensyanet_2017_01_maslul_klali.xml",
  //   storageID: 22,
  //   path: "/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/pensyanet_2017_01_maslul_klali.xml",
  //   error: "",
  //   status: 'Ready',
  // };
  //
  // // @ts-ignore
  // const file = await prisma.file.create({data: data});
  //
  // console.log(file);

  // console.log(results);
  // try {
  //   const results = await processFile('/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/pensyanet_2017_01_maslul_klali.xml');
  //   console.log(results);
  // } catch(e) {
  //   console.log(e);
  // }

})()
