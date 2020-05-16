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
    // todo: handle when the metadata key and the value are in the same key.
    if (Object.keys(fieldsTranslation).indexOf(sheetEntry[0]) === -1) {
        return;
    }

    metadata[fieldsTranslation[sheetEntry[0]]] = sheetEntry[1];
}

export default {
    processRowToMetadataObject: processRowToMetadataObject,
    rowIsHeader: rowIsHeader,
    rowShouldBeAppended: rowShouldBeAppended,
    checkNotInIsraelContext: checkNotInIsraelContext,
    checkIfSheetEntryIsMetadata: checkIfSheetEntryIsMetadata,
};
