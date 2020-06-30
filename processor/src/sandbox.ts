import {performanceProcess, singleAssetProcess} from './parse';

// singleAssetProcess('/Applications/MAMP/htdocs/open_pension/processor/1824508.XLSX').then((results: any) => {
//     console.log(JSON.stringify(results));
// });

performanceProcess('/Applications/MAMP/htdocs/open_pension/processor/src/ALL/מקיפה מסלול לבני 50 - 60 - פירוט תרומת אפיקי ההשקעה לתשואה מונגש.xlsx').then((results: any) => {
    console.log(JSON.stringify(results));
})

