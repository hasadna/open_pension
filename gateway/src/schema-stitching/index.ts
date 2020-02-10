import {HttpLink} from "apollo-link-http";
import {introspectSchema, makeRemoteExecutableSchema, mergeSchemas} from "apollo-server";
import fetch from "node-fetch";
import {retry} from "../utils/asyncUtils";
import {NoRemoteSchemasFound} from "./errors";

async function createRemoteSchema(serviceName) {
    const link = new HttpLink({uri: `http://${serviceName}`, fetch});

    let schema;
    try {
        schema = await retry(() => introspectSchema(link), 5);
        return makeRemoteExecutableSchema({schema, link});
    } catch (err) {
        return undefined;
    }
}

export async function createAndMergeRemoteSchemas() {
    const schemas = await Promise.all(["cms/drupal/web/graphql"].map(createRemoteSchema));
    const filteredSchemas = schemas.filter((schema) => schema !== undefined);
    if (filteredSchemas.length) {
        return mergeSchemas({schemas: filteredSchemas});
    } else {
        throw new NoRemoteSchemasFound("Couldn't generate remote schemas from any service.");
    }
}
