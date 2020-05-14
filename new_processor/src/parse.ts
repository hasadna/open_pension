const readXlsxFile = require('read-excel-file/node');
import {sheetsKeys, orderedSheets} from './sheets/metadata'

/**
 * todo: Copy tge object which holds the fields for each sheet.
 *
 * the flow is:
 * 2. Get the metadata(date of publishing etc. etc.)
 * 3. When going over the rows we need to know when the table statrted.
 * 4. After we know where the table started we need to get the context of the rows
 * 5. go over eaach full row, add the information of row with the ideitifiers (get which extra data we collect)
 * 6. construct the full object.
 */

const incrementSheetCount = 0;
const dontIncrementSheetCount = 1;

let SheetToSkip: any = {
    'סכום נכסי הקרן': incrementSheetCount,
    'Sheet1': dontIncrementSheetCount,
    '{PL}PickLst': dontIncrementSheetCount,
    'סקירת רוח מבקר': dontIncrementSheetCount,
    'אישור רוח': dontIncrementSheetCount,
};

/**
 *
 * @param path
 * @param sheetName
 */
async function processSheet(path: any, sheetName: any): Promise<any> {
    const sheetRows = await readXlsxFile(path, {sheet: sheetName});

    const metadata = {};

    sheetRows.forEach((rows: any) => {
        // todo:
        //  Get the metadata of the file.
        //  Get if the row is in israel.
        //  Get the context of the field.
        //  Collect the fields and combine it with the other elements.
        console.log(rows);
    })

    return new Promise((resolve, reject) => {
        resolve(sheetRows.length);
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
