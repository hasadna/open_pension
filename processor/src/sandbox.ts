import {excelParsing} from './parse';

excelParsing('/Applications/MAMP/htdocs/open_pension/processor/1823825.XLSX').then((results: any) => {
    console.log(JSON.stringify(results));
});

