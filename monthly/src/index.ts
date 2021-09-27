import { ApolloServer } from 'apollo-server';
import typeDefs from './server/typeDefs'
import resolvers from './server/resolvers'
import {createContext} from "./server/context";
import {KafkaClient} from "./services/kafka-client";
import {getPort} from "./services/env";
import {log} from "open-pension-logger";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  plugins: [{
    async serverWillStart() {
      const { prisma } = createContext();
      return {
        async serverWillStop() {
          log({text: 'Server about to stop - closing the DB connection'})
          await prisma.$disconnect();
          log({text: 'Server closed - DB connection closed'});
        }
      }
    }
  }],
});

server.listen({port: getPort()}).then(async ({ url }) => {
  try {
    log({text: "Starting kafka"});
    KafkaClient.listen();
  } catch (error) {
    log({text: `There was an error while trying to connect to kafka`, error}, 'error');
  }

  log({text: `🚀 Server ready ${url}`});
});
