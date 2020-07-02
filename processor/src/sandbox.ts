import {performanceProcess, singleAssetProcess} from './parse';

// singleAssetProcess('/Applications/MAMP/htdocs/open_pension/processor/1824508.XLSX').then((results: any) => {
//     console.log(JSON.stringify(results));
// });

performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/3b48kzpzkapg9wtk-512245812_g1110_yield120.xlsx').then((results: any) => {
    console.log(JSON.stringify(results['data']));
})

