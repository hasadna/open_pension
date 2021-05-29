// eslint-disable-next-line @typescript-eslint/no-var-requires

require('dotenv').config()

process.env.dbURL = 'mongodb://127.0.0.1/test';

import { File } from '../db/file';
import { User } from '../db/user';
import { Page } from "../db/page";
import { PageHelper } from '../db/pageHelper';

import * as server from '../server/server';

beforeEach(async () => {

  jest.spyOn(server, 'getUserFromRequest')
    .mockImplementation(async () => {
      return {user: {
          email: 'foo@gmail.com'
        }}
    });

  [User, File, Page, PageHelper].forEach(model => {
    model.deleteMany({})
  });
});
