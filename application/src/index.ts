import { createApolloServer } from "./graphql";
import { initSequelize } from "./sequelize";

initSequelize();
const apolloServer = createApolloServer();

apolloServer.listen({ port: 80 }).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
