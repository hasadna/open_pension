import {
  FileRowInterface,
  NumberType,
  ProcessedBituachXmlFileInterface
} from "./interfaces";

import {head} from 'lodash';

function processStringToNumber(stringedNumber: string[], numberType: NumberType): number {
  const numberFromString = numberType == NumberType.Int ? parseInt(head(stringedNumber)) : parseFloat(head(stringedNumber));

  if (isNaN(numberFromString)) {
    return 0;
  }

  return numberFromString;
}

/**
 * Parsing rows from the bituch file types.
 *
 * @param rawFieData
 *   The raw file data.
 */
export async function bituachProcess(rawFieData: ProcessedBituachXmlFileInterface): Promise<FileRowInterface[]> {
  const fileRows: FileRowInterface[] = [];

  rawFieData.ROWSET.ROW.forEach((row) => {
    fileRows.push({
      ID_MANAGER: processStringToNumber(row.ID_GUF, NumberType.Int),
      ALPHA_SHNATI: processStringToNumber(row.ALPHA_SHNATI, NumberType.Float),
      SHARP_RIBIT_HASRAT_SIKUN: processStringToNumber(row.SHARP_RIBIT_HASRAT_SIKUN, NumberType.Float),
      STIAT_TEKEN_36_HODASHIM: processStringToNumber(row.STIAT_TEKEN_36_HODASHIM, NumberType.Float),
      STIAT_TEKEN_60_HODASHIM: processStringToNumber(row.STIAT_TEKEN_60_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_36_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_36_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_60_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_60_HODASHIM, NumberType.Float),
      TSUA_MITZT_MI_THILAT_SHANA: processStringToNumber(row.TSUA_MITZ_MI_THILAT_HASHANA, NumberType.Float),
      TSUA_MITZTABERET_36_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_36_HODASHIM, NumberType.Float),
      TSUA_MITZTABERET_60_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_60_HODASHIM, NumberType.Float),
      TSUA_NOMINALIT_BRUTO_HODSHIT: processStringToNumber(row.TSUA_HODSHIT, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_3_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_3_SHANIM, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_5_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_5_SHANIM, NumberType.Float),
      YITRAT_NCHASIM_LSOF_TKUFA: processStringToNumber(row.YIT_NCHASIM_BFOAL, NumberType.Float)
    });
  });

  return fileRows;
}

/**
 * Processing a rows from gemel.
 */
export async function gemelProcess() {
  throw new Error("I'm not working yet :(");
}

/**
 * Process rows from pensya net.
 */
export async function pensyanetProcess() {
  throw new Error("I'm not working yet :(");
}

/**
 * Holding references by the source type.
 */
export const parsers = {
  bituach: bituachProcess,
  gemel: gemelProcess,
  pensya: pensyanetProcess
};

/**
 * Questions to mosh:
 * 1. In the destinatin mapping we have ID - this need to be with another name
 *    since ID is the row it self in the DB unless this is kind of unique
 *    identifier?
 * 2. SHARP_RIBIT_HASRAT_SIKUN - exists only in bituach and gemel, it does not
 *    exists in other places?
 * 3. The destination fields list is kind of small when comparing to what we
 *    really have in bituach source. Don't we want more items?
 */

