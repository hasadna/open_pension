import { createApolloServer } from "./app";

createApolloServer();

process.on("SIGINT", async () => {
    console.log("Disconnecting");
    process.exit();
});
