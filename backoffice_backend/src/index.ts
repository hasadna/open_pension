import {server} from "./server/server";
import express from 'express';
import cors from 'cors';
import {uploadMiddleware} from "./server/server";
import {unlinkSync} from "fs";
import {uploadFile} from "./utils/file";
import {createFile, Status} from "./db/file";
import {KafkaClient} from "./kafka/kafka-client";
import {log} from "open-pension-logger";

(async () => {
  const app = express();
  await server.start();

  app.use(cors());

  app.post('/file', uploadMiddleware, async (req, res) => {
    let uploadResults = true;

    req.body.uploadedFiles.map(async (filePath) => {
      try {
        const {data: {ID: storageId, filename}} = await uploadFile(filePath);
        await createFile({status: Status.sent, filename, storageId});
        unlinkSync(filePath);
      } catch (error) {
        log({text: `There was an error while trying to store the file`, error}, 'error');
        unlinkSync(filePath);
        uploadResults = false;
      }
    });

    const message = uploadResults ?
      {body: 'Uploaded successfully'} :
      {error: 'The storage service failed to response. Try again later'};
    res.status(201).json(message);
  });

  try {
    KafkaClient.listen();
    log({text: 'Start listen to kafka event'});
  } catch (error) {
    log({text: 'there was an error listing to the the kafka server', error}, 'error');
  }

  server.applyMiddleware({ app });
  await app.listen({ port: process.env.PORT })

  log({text: `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`});
  return { server, app };
})();

