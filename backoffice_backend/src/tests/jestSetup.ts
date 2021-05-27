// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

process.env.dbURL = 'mongodb://127.0.0.1/test';

import { File } from '../db/file';
import { User } from '../db/user';
import * as server from '../server/server';

beforeEach(async () => {

  jest.spyOn(server, 'getUserFromRequest')
    .mockImplementation(async () => {
      return {user: {
          email: 'foo@gmail.com'
        }}
    });

  await User.deleteMany({});
  await File.deleteMany({});
});

// afterEach(() => {
//   jest.clearAllMocks();
// });
