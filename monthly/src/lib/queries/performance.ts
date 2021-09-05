import type {PrismaClient} from '@prisma/client';
import {
  TimePeriod,
  QueryInterface,
  GetMatchingResultsFromDB,
  Rows,
  MatchingFundsIDsInterface,
  Months,
  colors,
} from './performanceTypesAndConsts';

/**
 * Getting the results for performance query by th given arguments.
 *
 * @param queryData
 * @param {number[]} queryData.fundId List of funds IDs.
 * @param {number[]} queryData.channel list of channel IDs.
 * @param {number[]} queryData.managingBody List of managing bodies IDs.
 * @param {number[]} queryData.timePeriod The time period upon we search the
 *  data in the DB.
 * @param {PrismaClient} queryData.prismaClient The time period upon we search
 *  the data in the DB.
 */
export async function query(queryData: QueryInterface) {
  const {channel, subChannel, bodies, timePeriod, prismaClient} = queryData;

  // Starting by getting the time range. We need the current datetime and the
  // the date object which represent the time period we needed - the last 5
  // years, the last 3 years etc.
  const {
    timeStartRange,
    timeEndRange
  } = convertTimePeriodToTimeRangeQuery(timePeriod);

  const funds = await getMatchingFundsIDs({channel, subChannel, managingBodies: bodies, prismaClient});

  // Now, we need to get all the matching results.
  const results = await getMatchingResultsFromDB({
    channel, subChannel, bodies, funds, timeStartRange, timeEndRange, prismaClient
  }) as Rows[];

  const fundNames = await getFundNamesFromDBResults(funds, prismaClient);

  const resultsFromDB = await processResults(results, fundNames);
  return {
    graph: convertDataToLineGraph(resultsFromDB),
    graphData: convertDataToColumnGraphData(resultsFromDB),
    tracksInfo: convertDataToTracksInfo(fundNames, prismaClient)
  };
}

/**
 * Get all the fund names by the fund IDs the getMatchingResultsFromDB returned
 * from the DB. This can be removed and combined with groupBy one prisma will
 * support it.
 *
 * @param {number[]} fundIDs The fund IDs we got from the DB.
 * @param {PrismaClient} prismaClient The prisma client object.
 */
async function getFundNamesFromDBResults(fundIDs: number[], prismaClient: PrismaClient) {
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
 * @param {TimePeriod} timePeriod The time period.
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
 * Get the matching funds by the channel, sub channel and managing body.
 *
 * @param channel The channel ID.
 * @param subChannel The sub channel ID.
 * @param managingBodies The managing bodies IDs.
 * @param prismaClient The prisma client object.
 */
async function getMatchingFundsIDs({channel, subChannel, managingBodies, prismaClient}: MatchingFundsIDsInterface): Promise<number[]> {
  const results = await prismaClient.fund.findMany({
    select: {
      fundID: true,
    },
    where: {
      channelID: channel,
      subChannelID: subChannel,
      managingBodyID: {
        in: managingBodies
      }
    },
  });

  return Object.values(results).map(({fundID}) => fundID);
}

/**
 * Getting results from the DB according to the given parameters.
 *
 * @param {GetMatchingResultsFromDB} input The parameters upon we'll construct
 *  the query to the DB.
 *
 * @param {number[]} input.fundId List of funds IDs.
 * @param {number[]} input.channel list of channel IDs.
 * @param {number[]} input.managingBody List of managing bodies IDs.
 * @param {Date} input.timeStartRange A date object which represent the starting
 *  time of the query in.
 * @param {Date} input.timeEndRange A date object which represent the ending
 *  time of the query in.
 * @param {PrismaClient} input.prismaClient The time period upon we search
 *  the data in the DB.
 */
export async function getMatchingResultsFromDB(input: GetMatchingResultsFromDB): Promise<any> {
  const {channel, bodies, funds, timeStartRange, timeEndRange, prismaClient} = input;

  return await prismaClient.row.groupBy({
    by: ['fundNameID', 'managingBodyID', 'channelID', 'TKUFAT_DIVUACH', 'TSUA_NOMINALIT_BRUTO_HODSHIT'],
    where: {
      TKUFAT_DIVUACH: {
        lte: timeStartRange,
        gte: timeEndRange,
      },
      channelID: channel,
      managingBodyID: {in: bodies},
      fundNameID: {in: funds},
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
 * @param {Rows[]} resultsFromDB The matching rows from the DB.
 * @param {fundNames} fundNames A key-value object which represent the fund ID
 *  and the name in the DB.
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

/**
 * Converting the results from the DB to the formant of the graph in the main
 * site.
 *
 * @param resultsFromDB The results form the DB.
 */
function convertDataToLineGraph(resultsFromDB) {
  const data = {};
  const nameOfMonth = {};
  const fundDeltaFromLastMonth = {};

  const getMonthFromTimeStamp = (timestamp) => {
    if (!Object.keys(nameOfMonth).includes(timestamp)) {
      const date = new Date(timestamp * 1000);
      nameOfMonth[timestamp] = `${Months[date.getMonth()]} ${date.getFullYear()}`;
      return nameOfMonth[timestamp];
    }

    return nameOfMonth[timestamp];
  };

  Object.entries(resultsFromDB).forEach(([month, value]) => {
    Object.entries(value).forEach(([fundName, value]) => {

      if (!Object.keys(data).includes(fundName)) {
        const previousMonth = new Date(parseInt(month) - (86400 * 30));

        // Starting the fund record with 100 for the previous month.
        fundDeltaFromLastMonth[fundName] = 100;
        data[fundName] = [
          {x: getMonthFromTimeStamp(previousMonth), y: fundDeltaFromLastMonth[fundName], fundName}
        ];
      }

      const currentMonthValue = fundDeltaFromLastMonth[fundName] * (1 + (value / 100));
      data[fundName].push({x: getMonthFromTimeStamp(month), y: currentMonthValue.toFixed(2), fundName});
      fundDeltaFromLastMonth[fundName] = currentMonthValue;
    });
  });

  return Object.entries(data).map(([fundId, data], key) => {
    return {
      "id": fundId,
      data,
      color: colors[key]
    }
  });
}

/**
 * Converting the results from the DB to the formant in which the column graph
 * in the front can handle.
 *
 * @param resultsFromDB The results form the DB.
 */
// @ts-ignore
// Ignore for now until I'll process the data.
function convertDataToColumnGraphData(resultsFromDB) {
  return {
    'עמיתים': null,
    'הלמן אלדובי': null,
    'מנורה': -2.2,
    'אלטשולר שחם': -1.2,
    'הפניקס': 0.08,
    'הראל': 1.10,
    'הכשרה': 1.8,
    'מגדל': 2.85,
    'ביטוח ישיר': 2.93,
    'הראל פיננסי': 4.51,
    'פסגות': 7.11,
    'יונים': 10.18,
  };
}

/**
 * Get the tracks info form the resultsFromDB.
 *
 * @param fundNames The metadata about the funds.
 * @param prismaClient The prisma client object.
 */
async function convertDataToTracksInfo(fundNames, prismaClient: PrismaClient) {
  const matchingFundsAndRows = await prismaClient.row.findMany({
    distinct: ['fundNameID'],
    orderBy: {
      TKUFAT_DIVUACH: 'asc'
    },
    include: {
      fundName: true,
    },
    where: {
      fundNameID: {
        in: Object.keys(fundNames).map((key) => parseInt(key))
      }
    },
  });

  return matchingFundsAndRows.map((matchingFundsAndRow) => {
    const {
      fundName: {ID, label},
      YITRAT_NCHASIM_LSOF_TKUFA,
      TSUA_SHNATIT_MEMUZAAT_5_SHANIM,
      TSUA_SHNATIT_MEMUZAAT_3_SHANIM,
      SHARP_RIBIT_HASRAT_SIKUN
    } = matchingFundsAndRow;
    return {
      fundNumber: ID,
      fundName: label,
      balance: YITRAT_NCHASIM_LSOF_TKUFA,
      yearlyRevenue: YITRAT_NCHASIM_LSOF_TKUFA,
      threeYearsAverageBalance: TSUA_SHNATIT_MEMUZAAT_3_SHANIM,
      fiveYearsAverageBalance: TSUA_SHNATIT_MEMUZAAT_5_SHANIM,
      sharp: SHARP_RIBIT_HASRAT_SIKUN ?? 0,
    }
  });
}
