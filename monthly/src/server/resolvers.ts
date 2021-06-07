export default {
  Query: {
    rows: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.row.findMany({
        include: {
          file: true
        }
      });
    },
    files: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.file.findMany({});
    },
    insuranceTypes: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.insuranceType.findMany({});
    },
    investmentTypes: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.investmentType.findMany({});
    },
    bodies: async (_, __, ctx) => {
      const {prisma} = ctx;
      return await prisma.body.findMany({});
    },
  },
};
