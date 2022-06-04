import {KafkaClient} from "./services/kafka-client";
import {getPort} from "./services/env";
import {log} from "open-pension-logger";
import {server} from "./server/server";

server.listen({port: getPort()}).then(async ({ url }) => {
  log({text: `🚀 Server ready ${url}`});

    log({text: "Starting kafka"});
    KafkaClient.listen()
      .then(() => {
        log({text: `🚀 Kafka is on`});
      })
      .catch((error) => {
        log({text: `There was an error while trying to connect to kafka`, error}, 'error');
      });
});
