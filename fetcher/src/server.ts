import "reflect-metadata";
import express from "express";
import graphqlHTTP from "express-graphql";
import {buildSchema} from "type-graphql";
import {getPort, getEnv} from "services/config-service";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
        emitSchemaFile: true
    });

    const app = express();
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true
        })
    );

    const port = getPort();
    const env = getEnv();
    app.listen(port, () => console.log(`Fetcher listening on port ${port}, environment ${env}`));
}

bootstrap()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
