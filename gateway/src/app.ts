import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql`
  type Query {
  }
`;


const resolvers = {
    Query: {
        books: () => [],
    },
};

export default new ApolloServer({typeDefs, resolvers});
