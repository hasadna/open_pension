import {performanceProcess, singleAssetProcess} from './parse';

const bad2 = '512227265_gsum_0419';
const bad3 = '510806870_gsum_0419';

singleAssetProcess(`/Applications/MAMP/htdocs/open_pension/processor/src/512227265_gsum_0419.xlsx`).then((results: any) => {
    console.log(JSON.stringify(results));
});
//
// performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/3b48kzpzkapg9wtk-512245812_g1110_yield120.xlsx').then((results: any) => {
//     console.log(JSON.stringify(results['data']));
// })

