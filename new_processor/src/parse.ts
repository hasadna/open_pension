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

const maxAmountItemsForBeingMetadata = 2;
const notInIsraelWords: string[] = ['מט"ח', 'חוץ לארץ', 'חו"ל']
const sheetToToSkip = ['סכום נכסי הקרן'];
let sheetsToDelete = ['Sheet1', '{PL}PickLst', 'סקירת רוח מבקר', 'אישור רוח',];

/**
 * Process a single sheet.
 *
 * @param path The file path.
 * @param sheetName The sheet name.
 * @param sheetKeys The keys of the sheet.
 */
async function processSheet(path: any, sheetName: any, sheetKeys: any): Promise<any> {
    const sheetRows = await readXlsxFile(path, {sheet: sheetName});
    const parsedSheet: any = [];
    let entryHeaderBeenChecked = false;

    const metadata: any = {
        'israel': true,
    };

    sheetRows.forEach((sheetEntry: any) => {
        // todo:
        //  Get the context of the field.
        //  add the missing fields.

        let parsedRow: any = {};

        // Getting the metadata of the sheet.
        if (checkIfSheetEntryIsMetadata(sheetEntry)) {
            processRowToMetadataObject(sheetEntry, metadata);
            return -1;
        }

        if (!checkNotInIsraelContext(sheetEntry[0])) {
            metadata['israel'] = false;
        }

        parsedRow = {...parsedRow, ...metadata}

        if (!entryRowShouldBeAppended(sheetEntry)) {
            return -1;
        }

        if (!entryHeaderBeenChecked) {

            if (entryRowIsHeader(sheetEntry)) {
                entryHeaderBeenChecked = true;
                return -1;
            }
        }

        Object.values(sheetKeys).map((item: any, key: any) => {
            parsedRow[item] = sheetEntry[key];
        });

        // Get the values of the sheet.
        parsedSheet.push(parsedRow);
    })

    return new Promise((resolve, reject) => {
        resolve(parsedSheet);
    });
}

function checkNotInIsraelContext(rowFirstEntry: any): boolean {
    let inIsrael = true;

    if (!rowFirstEntry) {
        return true;
    }

    notInIsraelWords.forEach((item: any) => {
        if (inIsrael && rowFirstEntry.includes(item)) {
            inIsrael = false;
        }
    });

    return inIsrael;
}

function entryRowShouldBeAppended(entry: any) {
    return entry[0] !== null && entry[1] !== null;
}

function entryRowIsHeader(entryRow: any): boolean {
    let allString = true;

    entryRow.forEach((cellValue: any) => {
        if (typeof cellValue !== 'string') {
            allString = false;
        }
    });

    return allString;
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
