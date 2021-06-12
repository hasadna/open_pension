export enum NumberType {
  Int = 'int',
  Float = 'float'
}

export enum ProcessState {
  Success = 'success',
  Failed = 'failed'
}

export enum FileStatus {
  Ready = 'Ready',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export interface File {
  ID: number,
  storageID: number,
  filename: string,
  path: string,
  created: Date,
  status: FileStatus,
  error: String
}

export interface InfoReturnInterface {
  status: boolean,
  message: string,
  payload?: any,
}

export interface ProcessedBituachXmlFileInterface {
  ROWSET: {
    DESCRIPTION1: string[],
    DESCRIPTION2: string[],
    ROW: ProcessedXmlFileBituachRowsInterface[],
  },
}

export interface ProcessedXmlFileBituachRowsInterface {
  ID_GUF: string[],
  ID: string[],
  SHEM_GUF: string[],
  TAARICH_HAFAKAT_HADOCH: string[],
  ID_HEVRA: string[],
  TKUFAT_HAKAMA: string[],
  TKUFAT_DIVUACH: string[],
  TSUA_MITZ_MI_THILAT_HASHANA: string[],
  TSUA_HODSHIT: string[],
  TSUA_MEMUZAAT_36_HODASHIM: string[],
  TSUA_MEMUZAAT_60_HODASHIM: string[],
  TSUA_MITZTABERET_36_HODASHIM: string[],
  TSUA_MITZTABERET_60_HODASHIM: string[],
  TSUA_SHNATIT_MEMUZAAT_3_SHANIM: string[],
  TSUA_SHNATIT_MEMUZAAT_5_SHANIM: string[],
  STIAT_TEKEN_36_HODASHIM: string[],
  STIAT_TEKEN_60_HODASHIM: string[],
  YIT_NCHASIM_BFOAL: string[], //?
  SHIUR_D_NIHUL_NECHASIM: string[],
  SHIUR_D_NIHUL_HAFKADOT: string[],
  SHARP_TSUA_HEZYONIT_ANAF: string[],
  SHARP_RIBIT_HASRAT_SIKUN: string[], //?
  ALPHA_SHNATI: string[],
  BETA_TA100: string[],
  BETA_AGACH_KONTZERNIOT_TZMUDOT: string[],
  BETA_AGACH_MEM_LO_TZMUDOT: string[], // ?
  BETA_AGACH_MEMSHALTIOT_TZMUDOT: string[], //?
  BETA_HUTZ_LAARETZ: string[],
  R_SQUARED: string[],
  YAHAS_NEZILUT: string[],
  NUM_HEVRA: string[],
  TAARICH_SIUM_PEILUT: string[],
  TSUA_MITZT_MI_THILAT_SHANA: string[],
  YITRAT_NCHASIM_LSOF_TKUFA: string[],
  TSUA_NOMINALIT_BRUTO_HODSHIT: string[],
}

export interface FileRowInterface {
  MANAGER_ID: number,
  ALPHA_SHNATI: number,
  SHARP_RIBIT_HASRAT_SIKUN?: number,
  STIAT_TEKEN_60_HODASHIM: number,
  STIAT_TEKEN_36_HODASHIM: number,
  TSUA_SHNATIT_MEMUZAAT_5_SHANIM: number,
  TSUA_SHNATIT_MEMUZAAT_3_SHANIM: number,
  TSUA_MITZTABERET_60_HODASHIM: number,
  TSUA_MITZTABERET_36_HODASHIM: number,
  TSUA_MEMUZAAT_60_HODASHIM: number,
  TSUA_MEMUZAAT_36_HODASHIM: number,
  TSUA_MITZT_MI_THILAT_SHANA: number,
  YITRAT_NCHASIM_LSOF_TKUFA: number,
  TSUA_NOMINALIT_BRUTO_HODSHIT: number
}

export interface ProcessResults {
  status: ProcessState,
  payload: FileRowInterface[],
  message: string
}
