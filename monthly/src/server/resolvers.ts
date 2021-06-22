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
  },
};
