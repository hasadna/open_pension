import {FileRowInterface} from "../interfaces";
import type { PrismaClient } from '@prisma/client'

export enum TimePeriod {
  THREE_MONTHS = '3_months',
  SIX_MONTHS = 'six_months',
  YEAR_START = 'year_start',
  LAST_TWELVE_MONTHS = 'last_12_months',
  LAST_THREE_YEARS = 'last_3_years',
  LAST_FIVE_YEARS = 'last_5_years',
}

interface QueryInterface {
  channel: number,
  subChannel: number,
  bodies: number[],
  timePeriod: TimePeriod,
  prismaClient: PrismaClient
}

interface GetMatchingResultsFromDB {
  channel: number,
  subChannel: number,
  bodies: number[],
  timeStartRange: Date,
  timeEndRange: Date,
  prismaClient: PrismaClient,
}

/**
 * Getting the results for performance query by th given arguments.
 *
 * @param queryData
 * @param queryData.channel The ID of the channel.
 * @param queryData.subChannel The ID of the sub channel.
 * @param queryData.bodies A list of body IDs.
 * @param queryData.timePeriod The time period upon we search the data in the DB.
 */
// @ts-ignore
export function query(queryData: QueryInterface) {
  const {channel, subChannel, bodies, timePeriod, prismaClient} = queryData;

  // Starting by getting the time range. We need the current datetime and the
  // the date object which represent the time period we needed - the last 5
  // years, the last 3 years etc.
  const {timeStartRange, timeEndRange} = convertTimePeriodToTimeRangeQuery(timePeriod);

  // Now, we need to get all the matching results.
  const results = getMatchingResultsFromDB({
    channel, subChannel, bodies, timeStartRange, timeEndRange, prismaClient
  });

  processResults(results);
}

/**
 * Get the date objects for the starting and ending time period which we'll
 * filter results from the DB.
 *
 * @param timePeriod The time period.
 */
export function convertTimePeriodToTimeRangeQuery(timePeriod: TimePeriod) {
  console.log(TimePeriod[timePeriod]);
  return {timeStartRange: new Date(), timeEndRange: new Date()}
}

/**
 *
 * Getting results from the DB according to the given parameters.
 *
 * @param input The parameters upon we'll construct the query to the DB.
 */
export function getMatchingResultsFromDB(input: GetMatchingResultsFromDB): FileRowInterface[] {
  // @ts-ignore
  const {channel, subChannel, bodies, timeStartRange, timeEndRange, prismaClient} = input;

  // @ts-ignore
  return [{}, {}]
}

/**
 * Processing all the results we got from the DB to match to the expected data
 * format which the consumer can handle.
 *
 * @param resultsFromDB The matching rows from the DB.
 */
// @ts-ignore
export function processResults(resultsFromDB: FileRowInterface[]) {
  // resultsFromDB.map((row: FileRowInterface) => {});
}
