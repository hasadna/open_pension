// eslint-disable-next-line @typescript-eslint/no-var-requires
import mongoose from "../db/db";

require('dotenv').config()

process.env.dbURL = 'mongodb://127.0.0.1/test';

import * as server from '../server/server';

import { File } from '../db/file';
import { User } from '../db/user';
import { Page } from "../db/page";
import { PageHelper } from '../db/pageHelper';

beforeEach(async () => {

  jest.spyOn(server, 'getUserFromRequest')
    .mockImplementation(async () => {
      return {user: {
          email: 'foo@gmail.com'
        }}
    });

  // Truncating models before the test starts.
  await User.deleteMany();
  await File.deleteMany();
  await Page.deleteMany();
  await PageHelper.deleteMany();
});

afterAll(() => mongoose.disconnect());
