import {query as performanceQuery} from '../lib/queries/performance';
import {TimePeriod} from "../lib/queries/performanceTypesAndConsts";

interface PerformanceInputArgs {
  input: {
    fundId: number[],
    channel: number[],
    managingBody: number[],
    timePeriod: TimePeriod
  }
}

export default {
  Query: {
    channels: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.channel.findMany({});
    },
    fundNames: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.fundName.findMany({});
    },
    managingBodies: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.managingBody.findMany({});
    },
    subChannels: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.subChannel.findMany({});
    },
    lastUpdated: async (_, __, ctx) => {
      const {prisma} = ctx;

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
      const {graph, graphData, legends, tracksInfo} = await performanceQuery({...args.input, ...{prismaClient}});

      return {
        graph: JSON.stringify(graph),
        graphData: JSON.stringify(graphData),
        tracksInfo,
        legends,
      }
    }
  },
};
