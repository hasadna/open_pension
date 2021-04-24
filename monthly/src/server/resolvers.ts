export default {
  Query: {
    // @ts-ignore
    rows: async (_, args, ctx) => {
      const {prisma} = ctx;
      return await prisma.row.findMany({
        include: {
          file: true
        }
      });
    },
    // @ts-ignore
    files: async (_, args, ctx) => {
      const {prisma} = ctx;
      return await prisma.file.findMany({});
    },
  },
};
