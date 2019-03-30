import {ApolloServer, gql} from "apollo-server";

const server = new ApolloServer({typeDefs, resolvers});

server.listen({ port: 80 }).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
