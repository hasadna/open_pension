import {excelParsing} from './parse';

excelParsing('/Applications/MAMP/htdocs/open_pension/new_processor/src/examples/512237744_psum_0219.xlsx').then((results: any) => {
    console.log(JSON.stringify(results));
});

