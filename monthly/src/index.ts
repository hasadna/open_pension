import { ApolloServer } from 'apollo-server';
import typeDefs from './server/typeDefs'
import resolvers from './server/resolvers'
import {createContext} from "./server/context";
import {KafkaClient} from "./services/kafka-client";
import {getPort} from "./services/env";
import {createIndex, log} from "./services/Logger";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  plugins: [{
    async serverWillStart() {
      const { prisma } = createContext();
      return {
        async serverWillStop() {
          log('Server about to stop - closing the DB connection')
          await prisma.$disconnect();
          log('Server closed - DB connection closed');
        }
      }
    }
  }],
});


server.listen({port: getPort()}).then(async ({ url }) => {

  await createIndex();

  try {
    log("Starting kafka");
    KafkaClient.listen();
  } catch (e) {
    log(`There was an error while trying to connect to kafka: ${e}`, 'error');
  }

  log(`🚀 Server ready ${url}`);
});
