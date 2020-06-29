import {performanceProcess, singleAssetProcess} from './parse';

// singleAssetProcess('/Applications/MAMP/htdocs/open_pension/processor/1824508.XLSX').then((results: any) => {
//     console.log(JSON.stringify(results));
// });

performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/3b48kzpzk8nbpghp-512245812_g1149_yield419.xlsx').then((results: any) => {
    console.log(JSON.stringify(results));
})

