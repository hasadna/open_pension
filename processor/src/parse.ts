import {api} from './parsing/api';
import {parseFile} from "./excelParser";

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
 * @param errors
 *  An array to append errors.
 */
async function processSheet(path: string, sheetName: string, sheetKeys: object, errors: string[]): Promise<any> {
    const sheetRows = await parseFile(path, {sheet: sheetName});
    const parsedSheet: any = [];
    let entryHeaderBeenChecked: boolean = false;

    const metadata: object = {
        'israel': true,
        'file_name': path.split('/').pop(),
        'Investment': sheetName,
        'index': '',
    };

    sheetRows.forEach((row: any) => {
        let parsedRow: any = {};

        // Getting the metadata of the sheet.
        if (api.checkIfSheetEntryIsMetadata(row)) {
            try {
                api.processRowToMetadataObject(row, metadata);
            } catch (e) {
                errors.push(`${sheetName}: ${e.message}`);
            }

            return -1;
        }

        if (!api.checkNotInIsraelContext(row[0])) {
            // The first cell of the row has word which consider as something not in israel. Switch the israel key to
            // false.
            metadata['israel'] = false;
        }

        parsedRow = {...parsedRow, ...metadata}

        try {
            if (!api.rowShouldBeAppended(row)) {

                // Try to set the local index.
                api.checkIfRowIsLocalContextAndAppend(row, metadata);

                // Row should be appended. Skipping.
                return -1;
            }
        } catch (e) {
            errors.push(`${sheetName}: ${e.message}`);
        }

        try {
            if (!entryHeaderBeenChecked) {

                if (api.rowIsHeader(row)) {
                    entryHeaderBeenChecked = true;
                    return -1;
                }
            }
        } catch (e) {
            errors.push(`${sheetName}: ${e.message}`);
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
    let sheets;
    let errors = [];

    try {
        // Get all the sheets.
        sheets = await parseFile(path, {getSheets: true});
    } catch (e) {
        return {'errors': e.message};
    }

    sheets = sheets.filter((data: any) => {
        return sheetsToDelete.indexOf(data.name) === -1;
    });

    // This is the number which indicate which sheet we need to parse. We have a predefined order because those bustards
    // give different names which later on might screw us in parsing and when read the data in power BI.
    const parsedData: any = {};

    await Promise.all(sheets.map(async (data: any, key: any) => {
        if (sheetToToSkip.indexOf(data.name) !== -1) {
            return -1;
        }

        let sheetName: string = orderedSheets[key];
        parsedData[sheetName] = await processSheet(path, data.name, sheetsKeys[sheetName], errors);
    }));

    return {data: parsedData, errors: errors};
}
