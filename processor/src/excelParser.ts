const readXlsxFile = require('read-excel-file/node');

export function parseFile (path, options): Promise<any> {
    return readXlsxFile(path, options);
}
