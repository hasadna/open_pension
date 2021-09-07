import { ApolloServer } from 'apollo-server';
import typeDefs from './server/typeDefs'
import resolvers from './server/resolvers'
import {createContext} from "./server/context";
import {KafkaClient} from "./services/kafka-client";
import {getPort} from "./services/env";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  plugins: [{
    async serverWillStart() {
      const { prisma } = createContext();
      return {
        async serverWillStop() {
          console.log('Server about to stop - closing the DB connection')
          await prisma.$disconnect();
          console.log('Server closed - DB connection closed');
        }
      }
    }
  }],
});


server.listen({port: getPort()}).then(({ url }) => {

  try {
    console.log('Starting kafka ')
    KafkaClient.listen();
  } catch (e) {
    console.error(e);
  }

  console.log(`🚀 Server ready ${url}`);
});
