import api from './parsing/api';
const readXlsxFile = require('read-excel-file/node');
import {orderedSheets, sheetsKeys} from './sheets/metadata'
import {sheetsToDelete, sheetToToSkip} from "./parsing/consts";


/**
 * Process a single sheet.
 *
 * @param path
 *  The file path.
 * @param sheetName
 *  The sheet name.
 * @param sheetKeys
 *  The keys of the sheet.
 */
async function processSheet(path: any, sheetName: any, sheetKeys: any): Promise<any> {
    const sheetRows = await readXlsxFile(path, {sheet: sheetName});
    const parsedSheet: any = [];
    let entryHeaderBeenChecked = false;

    const metadata: any = {
        'israel': true,
        'file_name': path.split('/').pop(),
        'Investment': sheetName,
    };

    sheetRows.forEach((row: any) => {
        let parsedRow: any = {};

        // Getting the metadata of the sheet.
        if (api.checkIfSheetEntryIsMetadata(row)) {
            api.processRowToMetadataObject(row, metadata);
            return -1;
        }

        if (!api.checkNotInIsraelContext(row[0])) {
            // The first cell of the row has word which consider as something not in israel. Switch the israel key to
            // false.
            metadata['israel'] = false;
        }

        parsedRow = {...parsedRow, ...metadata}

        if (!api.rowShouldBeAppended(row)) {
            // Row should be appended. Skipping.
            return -1;
        }

        if (!entryHeaderBeenChecked) {

            if (api.rowIsHeader(row)) {
                entryHeaderBeenChecked = true;
                return -1;
            }
        }

        Object.values(sheetKeys).map((item: any, key: any) => {
            parsedRow[item] = row[key];
        });

        // Get the values of the sheet.
        parsedSheet.push(parsedRow);
    })

    return new Promise((resolve, reject) => {
        resolve(parsedSheet);
    });
}

/**
 * Parsing excel file.
 *
 * @param path
 *  The path of the file.
 */
export async function excelParsing(path: string) {
    // Get all the sheets.
    let sheets = await readXlsxFile(path, {getSheets: true});

    sheets = sheets.filter((data: any) => {
        return sheetsToDelete.indexOf(data.name) === -1;
    });

    // This is the number which indicate which sheet we need to parse. We have a predefined order because those bustards
    // give different names which later on might screw us in parsing and when read the data in power BI.
    const parsedData: any = {};

    await Promise.all(sheets.splice(0, 5).map(async (data: any, key: any) => {
        if (sheetToToSkip.indexOf(data.name) !== -1) {
            return -1;
        }

        let sheetName: any = orderedSheets[key];
        parsedData[sheetName] = await processSheet(path, data.name, sheetsKeys[sheetName]);
    }));

    return parsedData;
}
