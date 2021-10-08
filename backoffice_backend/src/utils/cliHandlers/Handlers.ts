import createUser from './createUser';
import {Handler} from "./typesAndConsts";

export const handlers: Handler = {
  createUser: {
    handler: createUser,
    allowedValues: ['username', 'password', 'email'],
  },
};
