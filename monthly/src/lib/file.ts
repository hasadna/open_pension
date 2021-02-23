import {existsSync, readFileSync} from "fs";
import {
  DateFormats,
  FileRowInterface,
  InfoReturnInterface,
  NumberType,
  ProcessedXmlFileInterface
} from "./interfaces";
import {parseStringPromise} from "xml2js";
import * as loadash from "lodash";


const {head} = loadash;

/**
 * Reading a file and return the raw object.
 *
 * @param path
 *   The path of the file.
 */
export async function readFile(path: string): Promise<InfoReturnInterface> {
  if (!existsSync(path)) {
    return {
      status: false,
      message: 'The file does not exists',
    };
  }

  const results = readFileSync(path, 'utf-8');

  try {
    const processedXmlFile: ProcessedXmlFileInterface = await parseStringPromise(results);

    return {
      status: true,
      message: 'file processed',
      payload: processedXmlFile
    };
  } catch (e) {
    return {
      status: false,
      message: 'The file is not an xml file',
    };
  }
}

function processDateFromString(dateAsString: string, dateMode: DateFormats): Date {
  if (dateMode == DateFormats.Full) {
    const [day, month, year] = dateAsString.split('/');
    return new Date(`${year}-${month}-${day}Z`);
  }

  const [year, month] = [dateAsString.substring(0, 4), dateAsString.substring(5, 6)]
  return new Date(`${year}-${month}-1Z`);
}

function processStringToNumber(stringedNumber: string[], numberType: NumberType): number {
  const numberFromString = numberType == NumberType.Int ? parseInt(head(stringedNumber)) : parseFloat(head(stringedNumber));

  if (isNaN(numberFromString)) {
    return 0;
  }

  return numberFromString;
}

/**
 * Iterate over the raw object of the file and return a clean object to later on
 * inserted into the DB.
 *
 * @param rawFieData
 *   The raw file data.
 */
export function enrichRawFileObject(rawFieData: ProcessedXmlFileInterface): FileRowInterface[] {
  const fileRows: FileRowInterface[] = [];
  try {
    rawFieData.ROWSET.ROW.map(async (row) => {
      const publishingDate = new Date();
      fileRows.push({
        id_guf: processStringToNumber(row.ID_GUF, NumberType.Int),
        shem_guf: row.SHEM_GUF[0],
        taarich_hafakat_hadoch: processDateFromString(row.TAARICH_HAFAKAT_HADOCH[0], DateFormats.Full),
        id_hevra: parseInt(row.ID_HEVRA[0]),
        tkufat_hakama: row.TKUFAT_HAKAMA[0],
        tkufat_divuach: processDateFromString(row.TKUFAT_DIVUACH[0], DateFormats.Short),
        tsua_mitz_mi_thilat_hashana: processStringToNumber(row.TSUA_MITZ_MI_THILAT_HASHANA, NumberType.Float),
        tsua_hodshit: processStringToNumber(row.TSUA_HODSHIT, NumberType.Float),
        tsua_memuzaat36_hodashim: processStringToNumber(row.TSUA_MEMUZAAT_36_HODASHIM, NumberType.Float),
        tsua_memuzaat60_hodashim: processStringToNumber(row.TSUA_MEMUZAAT_60_HODASHIM, NumberType.Float),
        tsua_mitztaberet36_hodashim: processStringToNumber(row.TSUA_MITZTABERET_36_HODASHIM, NumberType.Float),
        tsua_mitztaberet60_hodashim: processStringToNumber(row.TSUA_MITZTABERET_60_HODASHIM, NumberType.Float),
        tsua_shnatit_memuzaat3_shanim: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_3_SHANIM, NumberType.Float),
        tsua_shnatit_memuzaat5_shanim: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_5_SHANIM, NumberType.Float),
        stiat_teken36_hodashim: processStringToNumber(row.STIAT_TEKEN_36_HODASHIM, NumberType.Float),
        stiat_teken60_hodashim: processStringToNumber(row.STIAT_TEKEN_60_HODASHIM, NumberType.Float),
        yit_nchasim_bfoal: processStringToNumber(row.YIT_NCHASIM_BFOAL, NumberType.Float),
        shiur_d_nihul_nechasim: processStringToNumber(row.SHIUR_D_NIHUL_NECHASIM, NumberType.Float),
        shiur_d_nihul_hafkadot: processStringToNumber(row.SHIUR_D_NIHUL_HAFKADOT, NumberType.Float),
        sharp_tsua_hezyonit_anaf: processStringToNumber(row.SHARP_TSUA_HEZYONIT_ANAF, NumberType.Float),
        sharp_ribit_hasrat_sikun: processStringToNumber(row.SHARP_RIBIT_HASRAT_SIKUN, NumberType.Float),
        alpha_shnati: processStringToNumber(row.ALPHA_SHNATI, NumberType.Float),
        beta_ta100: processStringToNumber(row.BETA_TA100, NumberType.Float),
        beta_agach_kontzerniot_tzmudot: processStringToNumber(row.BETA_AGACH_KONTZERNIOT_TZMUDOT, NumberType.Float),
        beta_agach_mem_lo_tzmudot: processStringToNumber(row.BETA_AGACH_MEM_LO_TZMUDOT, NumberType.Float),
        beta_agach_memshaltiot_tzmudot: processStringToNumber(row.BETA_AGACH_MEMSHALTIOT_TZMUDOT, NumberType.Float),
        beta_hutz_laaretz: processStringToNumber(row.BETA_HUTZ_LAARETZ, NumberType.Float),
        r_squared: processStringToNumber(row.R_SQUARED, NumberType.Float),
        yahas_nezilut: processStringToNumber(row.YAHAS_NEZILUT, NumberType.Float),
        num_hevra: processStringToNumber(row.NUM_HEVRA, NumberType.Int),
        taarich_sium_peilut: publishingDate, // TBD
      });
    });

    return fileRows;
  } catch (e) {
    console.error(e);
    return null;
  }

}

/**
 * Process a single file.
 *
 * @param path
 *  The path of the file to process.
 */
export async function processFile(path: string): Promise<FileRowInterface[]> {

  const {status, payload} = await readFile(path);

  if (!status) {
    return null;
  }

  return enrichRawFileObject(payload);
}
