import { createApolloServer } from "./graphql";
import { initSequelize } from "./sequelize";

async function init() {
    await initSequelize();
    const apolloServer = createApolloServer();

    apolloServer.listen({port: 80}).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });

}
process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});

init();
