import {performanceProcess, singleAssetProcess} from './parse';

const bad2 = '512227265_gsum_0419';
const bad3 = '510806870_gsum_0419';

// import {KafkaClient} from "./services/kafka-client";
//
// const kafka = new KafkaClient();
// kafka.sendMessage('asdasdasdasasd').then(resp => {
//     console.log(resp);
// }).catch((e) => {
//     console.error(e);
// });

singleAssetProcess(`/Applications/MAMP/htdocs/open_pension/processor/src/examples/512237744_psum_0219.xlsx`).then((results: any) => {
    console.log(JSON.stringify(results));
});
//
// performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/3b48kzpzkapg9wtk-512245812_g1110_yield120.xlsx').then((results: any) => {
//     console.log(JSON.stringify(results['data']));
// })

