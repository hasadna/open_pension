import type {PrismaClient} from '@prisma/client';

export enum TimePeriod {
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  YEAR_START = 'YEAR_START',
  LAST_TWELVE_MONTHS = 'LAST_TWELVE_MONTHS',
  LAST_THREE_YEARS = 'LAST_THREE_YEARS',
  LAST_FIVE_YEARS = 'LAST_FIVE_YEARS',
}

interface QueryInterface {
  fundId: number[],
  channel: number[],
  managingBody: number[],
  timePeriod: TimePeriod,
  prismaClient: PrismaClient
}

interface GetMatchingResultsFromDB {
  fundId: number[],
  channel: number[],
  managingBody: number[],
  timeStartRange: Date,
  timeEndRange: Date,
  prismaClient: PrismaClient,
}

interface Rows {
  fundNameID: number,
  TKUFAT_DIVUACH: Date,
  TSUA_NOMINALIT_BRUTO_HODSHIT: number,
}

const months = {
  0: 'ינואר', 1: 'פברואר', 2: 'מרץ', 3: 'אפריל', 4: 'מאי', 5: 'יוני', 6: 'יולי', 7: 'אוגוסט', 8: 'ספטמבר', 9: 'אוקטובר', 10: 'נובמבר', 11: 'דצמבר'
};

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
  const {channel, fundId, managingBody, timePeriod, prismaClient} = queryData;

  // Starting by getting the time range. We need the current datetime and the
  // the date object which represent the time period we needed - the last 5
  // years, the last 3 years etc.
  const {
    timeStartRange,
    timeEndRange
  } = convertTimePeriodToTimeRangeQuery(timePeriod);

  // Now, we need to get all the matching results.
  const results = await getMatchingResultsFromDB({
    channel, fundId, managingBody, timeStartRange, timeEndRange, prismaClient
  }) as Rows[];

  const fundNames = await getFundNamesFromDBResults(results, prismaClient);
  return convertDataToGraph(processResults(results, fundNames));
}

/**
 *
 * @param results
 * @param prismaClient
 */
async function getFundNamesFromDBResults(results: Rows[], prismaClient: PrismaClient) {
  const fundIDs = results.map(result => result.fundNameID);
  const funds = await prismaClient.fundName.findMany({
    where: {
      ID: {in: fundIDs}
    },
    select: {
      ID: true,
      label: true
    },
  });

  const data = {};

  funds.forEach(({ID, label}) => {
    data[ID] = label;
  });

  return data;
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
  timeStartRange.setUTCHours(0, 0, 0, 0);
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
export async function getMatchingResultsFromDB(input: GetMatchingResultsFromDB): Promise<any> {
  const {fundId, channel, managingBody, timeStartRange, timeEndRange, prismaClient} = input;

  // @ts-ignore
  return await prismaClient.row.groupBy({
    by: ['fundNameID', 'managingBodyID', 'channelID', 'TKUFAT_DIVUACH', 'TSUA_NOMINALIT_BRUTO_HODSHIT'],
    where: {
      TKUFAT_DIVUACH: {
        lte: timeStartRange,
        gte: timeEndRange,
      },
      channelID: {in: channel},
      managingBodyID: {in: managingBody},
      fundNameID: {in: fundId},
    },
    orderBy: {
      TKUFAT_DIVUACH: 'asc'
    },
  });
}

/**
 * Processing all the results we got from the DB to match to the expected data
 * format which the consumer can handle.
 *
 * @param resultsFromDB The matching rows from the DB.
 * @param fundNames
 */
export function processResults(resultsFromDB: Rows[], fundNames: object) {
  const data = {};

  resultsFromDB.forEach(({TKUFAT_DIVUACH, fundNameID, TSUA_NOMINALIT_BRUTO_HODSHIT}) => {
    const timestamp = String(TKUFAT_DIVUACH.getTime() / 1000);

    if (!Object.keys(data).includes(timestamp)) {
      data[timestamp] = {};
    }

    data[timestamp][fundNames[fundNameID]] = TSUA_NOMINALIT_BRUTO_HODSHIT;
  })

  return data;
}

function convertDataToGraph(graph) {
  const data = {};
  const nameOfMonth = {};
  const getMonthFromTimeStamp = (timestamp) => {
    if (!Object.keys(nameOfMonth).includes(timestamp)) {
      const date = new Date(timestamp * 1000);
      nameOfMonth[timestamp] = `${months[date.getMonth()]} ${date.getFullYear()}`;
      return nameOfMonth[timestamp];
    }

    return nameOfMonth[timestamp];
  };

  Object.entries(graph).forEach(([month, value]) => {
    Object.entries(value).forEach(([fundName, value]) => {
      if (!Object.keys(data).includes(fundName)) {
        data[fundName] = [];
      }

      data[fundName].push({x: getMonthFromTimeStamp(month), y: value, fundName});
    });
  });

  return Object.entries(data).map(([fundId, data]) => {
    return {
      "id": fundId,
      data
    }
  });
}
