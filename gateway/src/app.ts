import { ApolloServer, introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from "apollo-server";

import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

async function createRemoteSchema(serviceName) {
    const link = new HttpLink({uri: `http://${serviceName}`, fetch});

    const schema = await introspectSchema(link);

    return makeRemoteExecutableSchema({
        schema,
        link,
    });
}

export async function createApolloServer() {
    const schemas = await Promise.all(["blog"].map(createRemoteSchema));
    const mergedSchema = mergeSchemas({ schemas });
    const app = new ApolloServer({schema: mergedSchema});

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    app.listen({ port: 80 }).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
