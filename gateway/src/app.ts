import {
    ApolloServer,
    introspectSchema,
    makeRemoteExecutableSchema,
    mergeSchemas } from "apollo-server";

import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import { retry } from "./utils/asyncUtils";

async function createRemoteSchema(serviceName) {
    const link = new HttpLink({uri: `http://${serviceName}`, fetch});

    let schema;
    try {
        schema = await retry(() => introspectSchema(link), 5);
        return makeRemoteExecutableSchema({ schema, link });
    } catch (err) {
        return undefined;
    }
}

export async function createApolloServer() {
    const schemas = await Promise.all(["blog"].map(createRemoteSchema));
    const filteredSchemas = schemas.filter((schema) => schema !== undefined);
    const mergedSchema = mergeSchemas({ schemas: filteredSchemas });
    const app = new ApolloServer({schema: mergedSchema});

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    app.listen({ port: 80 }).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
