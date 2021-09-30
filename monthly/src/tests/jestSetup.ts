import {prisma} from "../server/context";

let DATABASE_URL;

beforeEach(async () => {
  DATABASE_URL = process.env.DATABASE_URL;
  process.env.DATABASE_URL = process.env.DATABASE_TESTING_URL;
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
  process.env.DATABASE_URL = DATABASE_URL;
});
