import ApolloClient from 'apollo-client';

const client = new ApolloClient();

export function provideClient(): ApolloClient {
  return client;
}
