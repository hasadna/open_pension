import {fieldsTranslation} from "../sheets/metadata";
import {notInIsraelWords, maxAmountItemsForBeingMetadata, instrumentNameKey, instrumentNumberKey} from './consts'

/**
 * Check if the given row is in israel or not.
 *
 * @param rowFirstColumn
 *  The first column of the row.
 */
function checkNotInIsraelContext(rowFirstColumn: any): boolean {
    let inIsrael = true;

    if (!rowFirstColumn) {
        // Nothing in this row.
        return true;
    }

    // Go over the words we considering as something not in israel.
    notInIsraelWords.forEach((item: any) => {
        if (inIsrael && rowFirstColumn.includes(item)) {
            // As long as the flag of in israel is true, that mean we did not find any words which indicate about that.
            inIsrael = false;
        }
    });

    return inIsrael;
}

/**
 * Checkin if a current sheet entry is a metadata or not.
 *
 * @param row
 *  A row in the sheet.
 */
function checkIfSheetEntryIsMetadata(row: any): boolean {
    // Only rows with less then two cells with values are consider as a metadata.
    return row.filter((item: any) => item).length <= maxAmountItemsForBeingMetadata;
}

/**
 * Checking if the row contains data we need to consider. Onl row which has data in the first and second column consider
 * rows as a data we need to collect.
 *
 * @param row
 *  A row in the sheet.
 */
function rowShouldBeAppended(row: any) {
    return row[instrumentNameKey] !== null && row[instrumentNumberKey] !== null;
}

/**
 * There are two types of contexts: israel or not and a row which located above a block of holdings.
 *
 * A local context is a row which only the first, second and third are empty. After identifying that row, we need to
 * remove the "total" word from the cell.
 *
 * @param row
 *  The row we iterating.
 * @param metadata
 *  The metadata to set the local context.
 */
function checkIfRowIsLocalContextAndAppend(row: any, metadata: any) {
    if (!(row[0] !== null && row[1] === null && row[2] === null)) {
        return;
    }

    metadata['index'] = row[0].replace('סה"כ', '');
}

/**
 * Checking if the row is the header of the table. The table header is constructed from strings only so any row which
 * all the columns has a string type value will be consider as the table header.
 *
 * @param row
 *  A row in the sheet.
 */
function rowIsHeader(row: any): boolean {
    let onlyStringValues = true;

    row.forEach((cellValue: any) => {
        if (typeof cellValue !== 'string') {
            onlyStringValues = false;
        }
    });

    return onlyStringValues;
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

    let sheetEntryToCheck = sheetEntry;
    if (sheetEntry.filter((item: any) => item).length === 1 && sheetEntry[0] !== null && sheetEntry[0].includes(':')) {
        // This is a metadata row which the label of the metadata and the value are at the same field. Split them and
        // continue as plan.
        sheetEntryToCheck = sheetEntry[0].split(':')
    }

    if (Object.keys(fieldsTranslation).indexOf(sheetEntryToCheck[0]) === -1) {
        return;
    }

    metadata[fieldsTranslation[sheetEntryToCheck[0].trim()]] = sheetEntryToCheck[1].trim();
}

export default {
    processRowToMetadataObject: processRowToMetadataObject,
    rowIsHeader: rowIsHeader,
    rowShouldBeAppended: rowShouldBeAppended,
    checkNotInIsraelContext: checkNotInIsraelContext,
    checkIfSheetEntryIsMetadata: checkIfSheetEntryIsMetadata,
    checkIfRowIsLocalContextAndAppend: checkIfRowIsLocalContextAndAppend,
};
