import {prisma} from "./server/context";

beforeEach(async () => {
  await prisma.$connect();

  const tablesToDelete = [prisma.file.deleteMany()]
  await prisma.$transaction(tablesToDelete)
});

afterAll(async () => {
  await prisma.$disconnect();
});
