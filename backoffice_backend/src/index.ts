import {server} from "./server/server";
import express from 'express';
import cors from 'cors';
import {uploadMiddleware} from "./server/server";
import {unlinkSync} from "fs";
import {uploadFile} from "./utils/file";
import {createFile, Status} from "./db/file";
import {getKafkaOn} from "./utils/config";
import {KafkaClient} from "./kafka/kafka-client";

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
      } catch (e) {
        console.error(e);
        unlinkSync(filePath);
        uploadResults = false;
      }
    });

    const message = uploadResults ?
      {body: 'Uploaded successfully'} :
      {error: 'The storage service failed to response. Try again later'};
    res.status(201).json(message);
  });

  if (getKafkaOn()) {
    try {
      KafkaClient.listen();
    } catch (e) {
      console.error(e);
    }
  }

  server.applyMiddleware({ app });

  // @ts-ignore
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
})();

