import {api} from './parsing/api';
import {parseFile} from "./excelParser";

import {orderedSheets, sheetsKeys} from './sheets/metadata'
import {sheetsToDelete, sheetToToSkip} from "./parsing/consts";

const months = {
    1: 'ינואר',
    2: 'פברואר',
    3: 'מרץ',
    4: 'אפריל',
    5: 'מאי',
    6: 'יוני',
    7: 'יולי',
    8: 'אוגוסט',
    9: 'ספטמבר',
    10: 'נובמבר',
    11: 'אוקטובר',
    12: 'דצמבר',
}

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
async function processSingleAssetSheet(path: string, sheetName: string, sheetKeys: object, errors: string[]): Promise<any> {
    let sheetRows;
    try {
        sheetRows = await parseFile(path, {sheet: sheetName});
    } catch (e) {
        errors.push(e)
        return;
    }

    const parsedSheet: any = [];
    let entryHeaderBeenChecked: boolean = false;

    const metadata: object = {
        'israel': true,
        'file_name': path.split('/').pop(),
        'Investment': sheetName,
        'index': '',
    };

    let skipFirstRow = false;

    if (sheetRows[0]) {
        skipFirstRow = sheetRows[0][0] === null && sheetRows[0][1] != null;
    }

    sheetRows.forEach((row: any) => {
        let parsedRow: any = {};

        if (skipFirstRow) {
            row = row.splice(1);
        }

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

        if (!sheetKeys) {
            return;
        }

        Object.values(sheetKeys).map((item: any, key: any) => {
            parsedRow[item] = row[key];
        });

        // Send the parsed row over kafka event.

        // Get the values of the sheet.
        parsedSheet.push(parsedRow);
    })

    return new Promise((resolve, reject) => {
        resolve(parsedSheet);
    });
}

function getYerFromPerformance(str): string {
    const regex = /([0-9]{2,4})/gm;
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        return m[0];
    }
}

async function processPerformanceSheet(parsedData: string, machineSheetName: string, path: string, sheetName: string, sheetKeys: object, errors: string[]): Promise<any> {
    let sheetRows;

    try {
        sheetRows = await parseFile(path, {sheet: sheetName});
    } catch (e) {
        errors.push(e)
        return;
    }

    const parsedSheet = [];
    let foundFirstRow = false;
    let foundLastRow = false;
    let year: string = "0";

    sheetRows.forEach((row: any, key: number) => {
        let foundFirst  = false;

        row = row.filter(item => {
            // Filtering all the null items which comes before an item with a real value.

            if (foundFirst) {
                // Once we got an item that's mean that all the items, even those which are null, are OK for us.
                return true;
            }

            if (item) {
                // This is the first valid item, set the flag to true and return true anyway.
                foundFirst = true;
                return true;
            }

            // Until we'll find any item, the item will be return leave it to JS to decide if the filter it or not.
            return item
        })

        if (foundLastRow) {
            return;
        }

        if (row[0] === "מזומנים ושווי מזומנים") {

            [key-1, key-2].map((headerRowKey: any) => {
                sheetRows[headerRowKey].map((item: any) =>  {
                    if (year !== "0") {
                        return;
                    }

                    const matchedYear = getYerFromPerformance(item);

                    if (matchedYear) {
                        year = matchedYear;
                    }
                });
            });

            if (year.length == 2) {
                year = `20${year}`
            }

            foundFirstRow = true;
        }

        if (!foundFirstRow || row[0].includes("תשואה חודשית")) {
            return;
        }

        iterateSingleRow(machineSheetName, parsedData, year, row);

        if (row[0] && row[0].includes("סה\"כ")) {
            foundLastRow = true;
        }
    });

    return new Promise((resolve, reject) => {
        resolve(parsedSheet);
    });
}

function iterateSingleRow(machineSheetName, parsedSheet, year, row) {
    const [title, rowWithoutTitle] = [row[0], row.splice(1, 24)];

    rowWithoutTitle.map((item: any, key: any) => {
        const monthIndex = Math.round((key + 1)/2);

        const subTitle = key % 2 == 0 ? 'תרומה לתשואה' : 'שיעור מסך הנכסים';
        parsedSheet.push({
            sheet: machineSheetName,
            title: title,
            date: `${months[monthIndex]} ${year}`,
            subTitle,
            value: item
        });
    });
}

/**
 * Parsing a single asset file type.
 *
 * @param path
 *  The path of the file.
 */
export async function singleAssetProcess(path: string) {
    let sheets;
    let errors = [];

    try {
        // Get all the sheets.
        sheets = await parseFile(path, {getSheets: true});
    } catch (e) {
        return {data: {}, errors: e.message};
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
        parsedData[sheetName] = await processSingleAssetSheet(path, data.name, sheetsKeys[sheetName], errors);
    }));

    return {data: parsedData, errors: errors};
}

export async function performanceProcess(path: string) {
    let sheets;
    let errors = [];

    try {
        // Get all the sheets.
        sheets = await parseFile(path, {getSheets: true});
    } catch (e) {
        return {data: {}, errors: e.message};
    }

    const parsedData: any = [];

    const gilion = 'גליון';

    await Promise.all(sheets.map(async (data: any, key: any) => {
        await processPerformanceSheet(parsedData, `${gilion}_${key+1}`, path, data.name, sheetsKeys[key], errors);
    }));

    return {data: parsedData, errors: errors};
}
