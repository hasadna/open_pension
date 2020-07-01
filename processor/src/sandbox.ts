import {performanceProcess, singleAssetProcess} from './parse';

// singleAssetProcess('/Applications/MAMP/htdocs/open_pension/processor/1824508.XLSX').then((results: any) => {
//     console.log(JSON.stringify(results));
// });

performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/513765347_g1059_Yield120.xlsx').then((results: any) => {
    console.log(JSON.stringify(results));
})

