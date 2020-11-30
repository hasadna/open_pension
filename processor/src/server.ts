// @ts-ignore
import express from "express";
import uploadMiddleware from "./server/uploadMiddleware";

import {getPort} from "./services/env";

import {welcome} from "./server/welcome";
import {uploadFile} from "./server/upload";
import {process} from "./server/process";
import {results} from "./server/results";
import {KafkaClient} from "./services/kafka-client";

const app = express();

app.use(express.json())

app.get("/", welcome)
app.post("/upload", uploadMiddleware, uploadFile)
app.patch("/process/:object_id", process)
app.get("/results/:object_id", results)

const port = getPort();

// listening to the kafka events.
KafkaClient.listen();

app.listen(port, () => console.log(`Fetcher listening on port ${port}`));
