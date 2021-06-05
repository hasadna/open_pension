import {createTestClient} from 'apollo-server-testing';
import {server} from '../server';

export const createTestingServer = () => {
  return createTestClient(server);
}

export const sendQuery = async (graphqlQuery, testingServer) => {
  const {query} = testingServer;
  return await query({ query: graphqlQuery });
};
