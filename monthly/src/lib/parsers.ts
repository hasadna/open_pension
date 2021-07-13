import {
  FileRowInterface,
  NumberType,
  ProcessedBituachXmlFileInterface,
  ReclamationResults
} from "./interfaces";

import {prisma} from "../server/context";

import {head, isEmpty} from 'lodash';

const reclamationData: any = {};

export async function getReclamationData(fundID: number): Promise<ReclamationResults|any> {

  if (Object.keys(reclamationData).includes(String(fundID))) {
    return reclamationData[fundID];
  }

  // Get it form the DB.
  const results = await prisma.fund.findFirst({where: {
      fundID
  }});

  if (isEmpty(results)) {
    return {};
  }

  // Build the data, save it a temporary cache and return it.
  const dataToStore = {
    managingBody: {connect: {ID: results.managingBodyID}},
    homebase: {connect: {ID: results.homebaseID}},
    channel: {connect: {ID: results.channelID}},
    subChannel: {connect: {ID: results.subChannelID}},
    fundName: {connect: {ID: results.fundNameID}},
    passiveActive: {connect: {ID: results.passiveActiveID}},
    type: {connect: {ID: results.typeID}},
    status: {connect: {ID: results.statusID}},
  };

  reclamationData[fundID] = dataToStore;

  return dataToStore;
}

function processStringToNumber(stringedNumber: string[], numberType: NumberType): number {
  const numberFromString = numberType == NumberType.Int ? parseInt(head(stringedNumber)) : parseFloat(head(stringedNumber));

  if (isNaN(numberFromString)) {
    return 0;
  }

  return numberFromString;
}

function convertTkufatDivuachToDate(tkufatDivuach: string[]): Date {
  const [year, month] = [tkufatDivuach[0].substr(0,4), tkufatDivuach[0].substr(4,2)];
  return new Date(`${year}-${month}-01T00:00:00.000Z`);
}

/**
 * Parsing rows from the bituch file types.
 *
 * @param rawFieData
 *   The raw file data.
 */
export async function bituachProcess(rawFieData: ProcessedBituachXmlFileInterface): Promise<FileRowInterface[]> {
  const fileRows: FileRowInterface[] = [];

  for (let row of rawFieData.ROWSET.ROW) {
    const rowID = processStringToNumber(row.ID, NumberType.Int);
    const reclamationData = await getReclamationData(rowID);

    fileRows.push({
      row_ID: rowID,
      MANAGER_ID: processStringToNumber(row.ID_GUF, NumberType.Int),
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
      YITRAT_NCHASIM_LSOF_TKUFA: processStringToNumber(row.YIT_NCHASIM_BFOAL, NumberType.Float),
      TKUFAT_DIVUACH: convertTkufatDivuachToDate(row.TKUFAT_DIVUACH),
      ...reclamationData
    });
  }

  return fileRows;
}

/**
 * Processing a rows from gemel.
 */
export async function gemelProcess(rawFieData: ProcessedBituachXmlFileInterface) {
  const fileRows: FileRowInterface[] = [];

  for (let row of rawFieData.ROWSET.Row) {
    const rowID = processStringToNumber(row.ID, NumberType.Int);
    const reclamationData = await getReclamationData(rowID);

    if (isEmpty(reclamationData)) {
      // todo: Find a way to add errors to the file process.
      console.error(`There is no reclamation data for fundID ${rowID}`)
    }

    fileRows.push({
      row_ID: rowID,
      MANAGER_ID: processStringToNumber(row.ID, NumberType.Int),
      ALPHA_SHNATI: processStringToNumber(row.ALPHA_SHNATI, NumberType.Float),
      STIAT_TEKEN_60_HODASHIM: processStringToNumber(row.STIAT_TEKEN_60_HODASHIM, NumberType.Float),
      STIAT_TEKEN_36_HODASHIM: processStringToNumber(row.STIAT_TEKEN_36_HODASHIM, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_5_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_5_SHANIM, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_3_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_3_SHANIM, NumberType.Float),
      TSUA_MITZTABERET_60_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_60_HODASHIM, NumberType.Float),
      TSUA_MITZTABERET_36_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_36_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_60_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_60_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_36_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_36_HODASHIM, NumberType.Float),
      TSUA_MITZT_MI_THILAT_SHANA: processStringToNumber(row.TSUA_MITZT_MI_THILAT_SHANA, NumberType.Float),
      YITRAT_NCHASIM_LSOF_TKUFA: processStringToNumber(row.YITRAT_NCHASIM_LSOF_TKUFA, NumberType.Float),
      TSUA_NOMINALIT_BRUTO_HODSHIT: processStringToNumber(row.TSUA_NOMINALIT_BRUTO_HODSHIT, NumberType.Float),
      TKUFAT_DIVUACH: convertTkufatDivuachToDate(row.TKUFAT_DIVUACH),
      ...reclamationData
    });
  }

  return fileRows;
}

/**
 * Process rows from pensya net.
 */
export async function pensyanetProcess(rawFieData: ProcessedBituachXmlFileInterface): Promise<FileRowInterface[]> {
  const fileRows: FileRowInterface[] = [];

  for (let row of rawFieData.ROWSET.ROW) {
    const rowID = processStringToNumber(row.ID, NumberType.Int);
    const reclamationData = await getReclamationData(rowID);

    fileRows.push({
      row_ID: rowID,
      MANAGER_ID: processStringToNumber(row.ID, NumberType.Int),
      ALPHA_SHNATI: processStringToNumber(row.ALPHA_SHNATI, NumberType.Float),
      STIAT_TEKEN_60_HODASHIM: processStringToNumber(row.STIAT_TEKEN_60_HODASHIM, NumberType.Float),
      STIAT_TEKEN_36_HODASHIM: processStringToNumber(row.STIAT_TEKEN_36_HODASHIM, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_5_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_5_SHANIM, NumberType.Float),
      TSUA_SHNATIT_MEMUZAAT_3_SHANIM: processStringToNumber(row.TSUA_SHNATIT_MEMUZAAT_3_SHANIM, NumberType.Float),
      TSUA_MITZTABERET_60_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_60_HODASHIM, NumberType.Float),
      TSUA_MITZTABERET_36_HODASHIM: processStringToNumber(row.TSUA_MITZTABERET_36_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_60_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_60_HODASHIM, NumberType.Float),
      TSUA_MEMUZAAT_36_HODASHIM: processStringToNumber(row.TSUA_MEMUZAAT_36_HODASHIM, NumberType.Float),
      TSUA_MITZT_MI_THILAT_SHANA: processStringToNumber(row.TSUA_MITZT_MI_THILAT_SHANA, NumberType.Float),
      YITRAT_NCHASIM_LSOF_TKUFA: processStringToNumber(row.YITRAT_NCHASIM_LSOF_TKUFA, NumberType.Float),
      TSUA_NOMINALIT_BRUTO_HODSHIT: processStringToNumber(row.TSUA_NOMINALIT_BRUTO_HODSHIT, NumberType.Float),
      TKUFAT_DIVUACH: convertTkufatDivuachToDate(row.TKUFAT_DIVUACH),
      ...reclamationData
    });
  }

  return fileRows;
}

/**
 * Holding references by the source type.
 */
export const parsers = {
  bituachnet: bituachProcess,
  gemel: gemelProcess,
  pensya: pensyanetProcess
};
