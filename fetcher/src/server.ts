import "reflect-metadata";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "type-graphql";
require("dotenv").config();

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

  const port = parseInt(process.env.PORT || "3000");

  app.listen(port, () => console.log(`Fetcher listening on port ${port}!`));
}

bootstrap()
.catch(err => {
  console.error(err);
  process.exit(1);
});
