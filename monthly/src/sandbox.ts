import {processFile} from "./lib/file";

const path = '/Users/roysegall/Sites/localhost/open_pension/monthly/src/files/gemelnet_2017_01_perut.xml';
processFile(path).then((results) => {
  console.log(results);
}).catch(e => {
  console.error(e);
});
