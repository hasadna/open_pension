const readXlsxFile = require('read-excel-file/node');
import {sheetsKeys, orderedSheets, fieldsTranslation} from './sheets/metadata'

/**
 * todo: Copy tge object which holds the fields for each sheet.
 *
 * the flow is:
 * 3. When going over the rows we need to know when the table statrted.
 * 4. After we know where the table started we need to get the context of the rows
 * 5. go over eaach full row, add the information of row with the ideitifiers (get which extra data we collect)
 * 6. construct the full object.
 */

const incrementSheetCount = 0;
const dontIncrementSheetCount = 1;
const maxAmountItemsForBeingMetadata = 2;

let SheetToSkip: any = {
    'סכום נכסי הקרן': incrementSheetCount,
    'Sheet1': dontIncrementSheetCount,
    '{PL}PickLst': dontIncrementSheetCount,
    'סקירת רוח מבקר': dontIncrementSheetCount,
    'אישור רוח': dontIncrementSheetCount,
};

/**
 * Process a single sheet.
 *
 * @param path The file path.
 * @param sheetName The sheet name.
 */
async function processSheet(path: any, sheetName: any): Promise<any> {
    const sheetRows = await readXlsxFile(path, {sheet: sheetName});

    const metadata = {};
    const parsedSheet: any = [];

    sheetRows.forEach((sheetEntry: any) => {
        // todo:
        //  Get if the row is in israel.
        //  Get the context of the field.
        //  Collect the fields and combine it with the other elements.

        let parsedRow: any = {};

        // Getting the metadata of the sheet.
        if (checkIfSheetEntryIsMetadata(sheetEntry)) {
            processRowToMetadataObject(sheetEntry, metadata);
            return -1;
        }

        parsedRow = {...parsedRow, ...metadata};

        // Get the values of the sheet.
        parsedSheet.push(parsedRow);
    })

    return new Promise((resolve, reject) => {
        resolve(parsedSheet);
    });
}

/**
 * Checkin if a current sheet entry is a metadata or not.
 *
 * @param sheetEntry
 *  The sheet entry.
 */
function checkIfSheetEntryIsMetadata(sheetEntry: any): boolean {
    return sheetEntry.filter((item: any) => item).length <= maxAmountItemsForBeingMetadata;
}

/**
 * Processing the sheet entry to the metadata object.
 *
 * @param sheetEntry
 *  The sheet entry.
 * @param metadata
 *  The metadata object.
 */
function processRowToMetadataObject(sheetEntry: any, metadata: any) {
    // todo: handle when the metadata key and the value are in the same key.
    if (Object.keys(fieldsTranslation).indexOf(sheetEntry[0]) === -1) {
        return;
    }

    metadata[fieldsTranslation[sheetEntry[0]]] = sheetEntry[1];
}

/**
 * Parsing excel file.
 *
 * @param path
 *  The path of the file.
 */
export async function excelParsing(path: string) {
    // Get all the sheets.
    const sheets = await readXlsxFile(path, {getSheets: true});

    // This is the number which indicate which sheet we need to parse. We have a predefined order because those bustards
    // give different names which later on might screw us in parsing and when read the data in power BI.
    let incrementedIndex = 0;

    const parsedData: any = {};

    await Promise.all(sheets.splice(0, 5).map(async (data: any) => {

        if (Object.keys(SheetToSkip).indexOf(data.name) !== -1) {
            // This sheet should not be include in the final parsed data but it should not increment the sheet index as
            // well.

            if (SheetToSkip[data.name] === incrementSheetCount) {
                incrementedIndex++;
            }
            return;
        }

        const results = await processSheet(path, data.name);
        parsedData[orderedSheets[incrementedIndex]] = results;
        incrementedIndex++;
    }));

    return parsedData;
}
