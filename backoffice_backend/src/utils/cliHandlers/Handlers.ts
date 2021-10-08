import createUser from './createUser';

export const handlers = {
  createUser: {
    handler: createUser,
    allowedValues: ['username', 'password', 'email'],
  },
};
