import { ApolloServer } from 'apollo-server';
import typeDefs from './server/typeDefs'
import resolvers from './server/resolvers'
import {createContext} from "./server/context";

const server = new ApolloServer({ typeDefs, resolvers, context: createContext });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
