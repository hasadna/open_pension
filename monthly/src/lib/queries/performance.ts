import {FileRowInterface} from "../interfaces";
import type { PrismaClient } from '@prisma/client';

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
export async function query(queryData: QueryInterface) {
  const {channel, subChannel, bodies, timePeriod, prismaClient} = queryData;

  // Starting by getting the time range. We need the current datetime and the
  // the date object which represent the time period we needed - the last 5
  // years, the last 3 years etc.
  const {timeStartRange, timeEndRange} = convertTimePeriodToTimeRangeQuery(timePeriod);

  // Now, we need to get all the matching results.
  const results = await getMatchingResultsFromDB({
    channel, subChannel, bodies, timeStartRange, timeEndRange, prismaClient
  }) as FileRowInterface[];

  processResults(results);
}

/**
 * Get the date objects for the starting and ending time period which we'll
 * filter results from the DB.
 *
 * @param timePeriod The time period.
 */
export function convertTimePeriodToTimeRangeQuery(timePeriod: TimePeriod) {
  const handlers = {
    [TimePeriod.THREE_MONTHS]: (dateObjectToAlter) => {
      dateObjectToAlter.setUTCMonth(dateObjectToAlter.getMonth() - 3);
      return dateObjectToAlter;
    },
    [TimePeriod.SIX_MONTHS]: (dateObjectToAlter) => {
      dateObjectToAlter.setUTCMonth(dateObjectToAlter.getMonth() - 6);
      return dateObjectToAlter;
    },
    [TimePeriod.YEAR_START]: (dateObjectToAlter) => {
      dateObjectToAlter.setUTCMonth(0);
      return dateObjectToAlter;
    },
    [TimePeriod.LAST_TWELVE_MONTHS]: (dateObjectToAlter) => {
      dateObjectToAlter.setUTCMonth(dateObjectToAlter.getMonth() - 12);
      return dateObjectToAlter;
    },
    [TimePeriod.LAST_THREE_YEARS]: (dateObjectToAlter) => {
      dateObjectToAlter.setYear(dateObjectToAlter.getUTCFullYear() - 3);
      return dateObjectToAlter;
    },
    [TimePeriod.LAST_FIVE_YEARS]: (dateObjectToAlter) => {
      dateObjectToAlter.setYear(dateObjectToAlter.getUTCFullYear() - 5);
      return dateObjectToAlter;
    },
  };

  // Start by setting today's date to the the start of the month.
  let timeStartRange = new Date();
  timeStartRange.setUTCHours(0,0,0,0);
  timeStartRange.setUTCDate(1);

  // Clone the date object and manipulate the time.
  let timeEndRange = new Date(timeStartRange);
  timeEndRange = handlers[timePeriod](timeEndRange);

  return {timeStartRange, timeEndRange}
}

/**
 *
 * Getting results from the DB according to the given parameters.
 *
 * @param input The parameters upon we'll construct the query to the DB.
 */
export async function getMatchingResultsFromDB(input: GetMatchingResultsFromDB): Promise<object[]> {
  const {channel, subChannel, bodies, timeStartRange, timeEndRange, prismaClient} = input;

  return await prismaClient.row.findMany({
    orderBy: {
      TKUFAT_DIVUACH: 'asc'
    },
    where: {
      TKUFAT_DIVUACH: {
        lte: timeStartRange,
        gte: timeEndRange,
      },
      channelID: channel,
      subChannelID: subChannel,
      managingBodyID: {
        in: bodies
      }
    }
  });
}

/**
 * Processing all the results we got from the DB to match to the expected data
 * format which the consumer can handle.
 *
 * @param resultsFromDB The matching rows from the DB.
 */
// @ts-ignore
export function processResults(resultsFromDB: FileRowInterface[]) {

  console.log(resultsFromDB);
  // resultsFromDB.map((row: FileRowInterface) => {});
}
