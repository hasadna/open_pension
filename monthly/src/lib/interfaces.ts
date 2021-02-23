export enum DateFormats {
  Short = 'short',
  Full = 'full'
}

export enum NumberType {
  Int = 'int',
  Float = 'float'
}

export interface InfoReturnInterface {
  status: boolean,
  message: string,
  payload?: any,
}

export interface ProcessedXmlFileInterface {
  ROWSET: {
    DESCRIPTION1: string[],
    DESCRIPTION2: string[],
    ROW?: ProcessedXmlFileRowsInterface[],
    Row?: ProcessedXmlFileRowsInterface[],
  },
}

export interface ProcessedXmlFileRowsInterface {
  ID_GUF: string[],
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
  TAARICH_SIUM_PEILUT: string[]
}

export interface FileRowInterface {
  id_guf: number,
  shem_guf: string,
  taarich_hafakat_hadoch: Date,
  id_hevra: number,
  tkufat_hakama: string,
  tkufat_divuach: Date,
  tsua_mitz_mi_thilat_hashana: number,
  tsua_hodshit: number,
  tsua_memuzaat36_hodashim: number,
  tsua_memuzaat60_hodashim: number,
  tsua_mitztaberet36_hodashim: number,
  tsua_mitztaberet60_hodashim: number,
  tsua_shnatit_memuzaat3_shanim: number,
  tsua_shnatit_memuzaat5_shanim: number,
  stiat_teken36_hodashim: number,
  stiat_teken60_hodashim: number,
  yit_nchasim_bfoal: number,
  shiur_d_nihul_nechasim: number,
  shiur_d_nihul_hafkadot: number,
  sharp_tsua_hezyonit_anaf: number,
  sharp_ribit_hasrat_sikun: number,
  alpha_shnati: number,
  beta_ta100: number,
  beta_agach_kontzerniot_tzmudot: number,
  beta_agach_mem_lo_tzmudot: number,
  beta_agach_memshaltiot_tzmudot: number,
  beta_hutz_laaretz: number,
  r_squared: number,
  yahas_nezilut: number,
  num_hevra: number,
  taarich_sium_peilut: Date,
}
