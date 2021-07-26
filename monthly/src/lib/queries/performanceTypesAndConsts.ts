import {PrismaClient} from "@prisma/client";

export enum TimePeriod {
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  YEAR_START = 'YEAR_START',
  LAST_TWELVE_MONTHS = 'LAST_TWELVE_MONTHS',
  LAST_THREE_YEARS = 'LAST_THREE_YEARS',
  LAST_FIVE_YEARS = 'LAST_FIVE_YEARS',
}

export interface QueryInterface {
  fundId: number[],
  channel: number[],
  managingBody: number[],
  timePeriod: TimePeriod,
  prismaClient: PrismaClient
}

export interface GetMatchingResultsFromDB {
  fundId: number[],
  channel: number[],
  managingBody: number[],
  timeStartRange: Date,
  timeEndRange: Date,
  prismaClient: PrismaClient,
}

export interface Rows {
  fundNameID: number,
  TKUFAT_DIVUACH: Date,
  TSUA_NOMINALIT_BRUTO_HODSHIT: number,
}

export const Months = {
  0: 'ינואר',
  1: 'פברואר',
  2: 'מרץ',
  3: 'אפריל',
  4: 'מאי',
  5: 'יוני',
  6: 'יולי',
  7: 'אוגוסט',
  8: 'ספטמבר',
  9: 'אוקטובר',
  10: 'נובמבר',
  11: 'דצמבר'
};
