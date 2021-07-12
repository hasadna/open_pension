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
  },
};
