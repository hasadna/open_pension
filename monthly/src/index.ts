import { ApolloServer } from 'apollo-server';
import typeDefs from './server/typeDefs'
import resolvers from './server/resolvers'
import {createContext} from "./server/context";
// import {KafkaClient} from "./services/kafka-client";

const server = new ApolloServer({ typeDefs, resolvers, context: createContext });

server.listen().then(({ url }) => {

  // try {
  //   KafkaClient.listen();
  // } catch (e) {
  //   console.error(e);
  // }

  console.log(`🚀 Server ready ${url}`);
});
