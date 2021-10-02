import {prisma} from "../server/context";

beforeEach(async () => {
  await prisma.$connect();

  const tablesToDelete = [
    prisma.channel.deleteMany(),
    prisma.subChannel.deleteMany(),
    prisma.fundName.deleteMany(),
    prisma.managingBody.deleteMany(),
    prisma.row.deleteMany(),
    prisma.file.deleteMany(),
  ]
  await prisma.$transaction(tablesToDelete)
});

afterAll(async () => {
  await prisma.$disconnect();
});
