import {last} from "lodash";

import createUser from './cliHandlers/createUser';

const action = last(process.argv);

const actions = {
  createUser: createUser,
};

actions[action]();
