import {ApolloServer} from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {createContext} from "./context";
import {log} from "open-pension-logger";

export const server = new ApolloServer({
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
