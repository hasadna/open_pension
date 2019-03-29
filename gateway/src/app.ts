import { ApolloServer } from "apollo-server";
import { createAndMergeRemoteSchemas } from "./schema-stitching";

export async function createApolloServer() {
    try {
        const app = new ApolloServer({schema: await createAndMergeRemoteSchemas()});

        // This `listen` method launches a web-server.  Existing apps
        // can utilize middleware options, which we'll discuss later.
        app.listen({ port: 80 }).then(({url}) => {
            console.log(`Apollo Server ready at ${url} 🚀`);
        });
    } catch (error) {
        console.log("️Can't launch ApolloServer for some reason: 🤦");
        console.log(error);
    }
}
