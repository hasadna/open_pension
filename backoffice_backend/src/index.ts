import {server} from "./server/server";
import express from 'express';
import cors from 'cors';
import {uploadMiddleware} from "./server/server";
import {unlinkSync} from "fs";
import {uploadFile} from "./utils/file";
import {createFile, Status} from "./db/file";

(async () => {
  const app = express();
  await server.start();

  app.use(cors());

  app.post('/file', uploadMiddleware, async (req, res) => {
    const [filePath] = req.body.uploadedFile;
    console.log(req.body.uploadedFile);
    try {
      const {data: {ID: storageId, filename}} = await uploadFile(filePath);
      const results = await createFile({status: Status.sent, filename, storageId});

      console.log(results);
    } catch (e) {
      console.error(e);
      unlinkSync(filePath);
      res.status(400).json({error: 'The storage service failed to response. Try again later'});
    }

    unlinkSync(filePath);
    res.status(201).json({body: 'Uploaded successfully'});
  });

  server.applyMiddleware({ app });

  // @ts-ignore
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
})();

