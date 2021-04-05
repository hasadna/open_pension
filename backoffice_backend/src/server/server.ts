import { ApolloServer, AuthenticationError } from 'apollo-server';
import {isEmpty} from 'lodash';

import { loadUserByToken } from '../db/user';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

export const getUserFromRequest = async (req) => {
  if (isEmpty(req)) {
    return {};
  }

  if (isEmpty(req.headers)) {
    return {};
  }

  if (isEmpty(req.headers.authorization)) {
    return {};
  }

  const token = req.headers.authorization;
  const user = await loadUserByToken(token);

  if (isEmpty(user)) {
    return {};
  }

  return {user};
}

export const assertLoggedIn = ({user}) => {
  // todo: should be a middelware.
  if (isEmpty(user)) {
    throw new AuthenticationError('you must be logged in');
  }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return getUserFromRequest(req);
  },
});
