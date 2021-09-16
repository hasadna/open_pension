import {query as performanceQuery} from '../lib/queries/performance';
import {TimePeriod} from "../lib/queries/performanceTypesAndConsts";
import {log} from 'open-pension-logger';
import {getFileMetadata} from "../lib/db";

interface PerformanceInputArgs {
  input: {
    channel: number,
    subChannel: number,
    bodies: number[],
    timePeriod: TimePeriod
  }
}

export default {
  Query: {
    channels: async (_, __, ctx) => {
      const {prisma} = ctx;
      log('Requesting all the channels');
      return await prisma.channel.findMany({});
    },
    fundNames: async (_, __, ctx) => {
      const {prisma} = ctx;
      log('Requesting all the fund names');
      return await prisma.fundName.findMany({});
    },
    managingBodies: async (_, __, ctx) => {
      const {prisma} = ctx;
      log('Requesting all the managing bodies');
      return await prisma.managingBody.findMany({});
    },
    subChannels: async (_, __, ctx) => {
      const {prisma} = ctx;
      log('Requesting all the sub channels');
      return await prisma.subChannel.findMany({});
    },
    lastUpdated: async (_, __, ctx) => {
      const {prisma} = ctx;

      log('Requesting the last update');

      const {TKUFAT_DIVUACH} = await prisma.row.findFirst({
        take: 1,
        orderBy: {
          TKUFAT_DIVUACH: 'desc'
        },
        select: {
          TKUFAT_DIVUACH: true
        },
      });

      return TKUFAT_DIVUACH.getTime() / 1000;
    },
    missingFundData: async (_, __, ctx) => {
      const {prisma} = ctx;

      log(`Getting the missing fund data`);

      const data = await prisma.row.findMany({
        select: {
          row_ID: true
        },
        distinct: ['row_ID'],
        where: {
          missingReclamationData: true
        },
      });

      return Object.values(data).map((row: any) => row.row_ID);
    },
    performance: async (_, args: PerformanceInputArgs, {prisma: prismaClient}) => {
      const {graph, graphData, tracksInfo} = await performanceQuery({...args.input, ...{prismaClient}});

      log(`Requesting the performance query: ${String(JSON.stringify(args))}`);

      return {
        graph: JSON.stringify(graph),
        graphData: JSON.stringify(graphData),
        tracksInfo,
      }
    },
    fileInfo: async (_, args, {prisma: prismaClient}) => {
      return await getFileMetadata(args['storageID'], prismaClient);
    }
  },
};
