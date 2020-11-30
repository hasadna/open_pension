import "reflect-metadata";
import express from "express";
import graphqlHTTP from "express-graphql";
import {buildSchema} from "type-graphql";
import {getPort, getEnv} from "services/config-service";
import {KafkaClient} from "./clients/kafka-client";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
        emitSchemaFile: true
    });

    KafkaClient.listen();

    const app = express();
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true
        })
    );

    app.use("/", (req, res) => res.send({status: 'alive'}))

    const port = getPort();
    const env = getEnv();
    app.listen(port, () => console.log(`Fetcher listening on port ${port}, environment ${env}`));
}

bootstrap()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
