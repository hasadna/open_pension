import {excelParsing} from './parse';

excelParsing('/Applications/MAMP/htdocs/open_pension/processor/src/examples/full.xlsx').then((results: any) => {
    console.log(JSON.stringify(results));
});

