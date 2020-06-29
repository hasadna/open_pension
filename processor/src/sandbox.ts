import {singleAssetProcess} from './parse';

singleAssetProcess('/Applications/MAMP/htdocs/open_pension/processor/1824508.XLSX').then((results: any) => {
    console.log(JSON.stringify(results));
});

