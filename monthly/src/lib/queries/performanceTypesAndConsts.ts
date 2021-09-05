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
  channel: number,
  subChannel: number,
  bodies: number[],
  timePeriod: TimePeriod,
  prismaClient: PrismaClient
}

export interface GetMatchingResultsFromDB {
  channel: number,
  subChannel: number,
  bodies: number[]
  funds: number[],
  timeStartRange: Date,
  timeEndRange: Date,
  prismaClient: PrismaClient,
}

export interface Rows {
  fundNameID: number,
  TKUFAT_DIVUACH: Date,
  TSUA_NOMINALIT_BRUTO_HODSHIT: number,
}

export interface MatchingFundsIDsInterface {
  channel: number
  subChannel: number
  managingBodies: number[]
  prismaClient: PrismaClient
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

export const colors = [
  '#e8c1a0',
  '#f47560',
  '#f1e15b',
  '#e8a838',
  '#61cdbb',
  '#97e3d5',
  '#1f77b4',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#7fc97f',
  '#beaed4',
  '#f0027f',
  '#fbb4ae',
  '#b3cde3',
  '#ccebc5',
];

