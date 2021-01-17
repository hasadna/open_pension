export default {
  Query: {
    // @ts-ignore
    rows: async (_, args, ctx) => {
      const {prisma} = ctx;
      return await prisma.parsedFiles.findMany({});
    },
  },
};
