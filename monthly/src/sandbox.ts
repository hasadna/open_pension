// import {prisma} from "./server/context";
import {queue} from "./lib/queue";
// import {basename} from "path";

(async () => {
  //
  // [
  //   '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/bituachnet_2017_01_type0.xml',
  //   '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/bituachnet_2017_01_type2.xml',
  //   '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/gemelnet_2017_01_perut.xml',
  //   '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/pensyanet_2016_06_maslul_perut.xml',
  //   '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/pensyanet_2017_01_maslul_klali.xml',
  // ].map(async (path, index) => {
  //   const data = {
  //     filename: basename(path),
  //     storageID: index,
  //     path: path,
  //     error: "",
  //     status: 'Ready',
  //   };
  //
  //   // @ts-ignore
  //   const file = await prisma.file.create({data: data});
  // });
  //
  await queue();


})()
