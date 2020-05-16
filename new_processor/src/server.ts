// @ts-ignore
import express from "express";

import {getPort} from "./services/env";
import {welcome} from "./server/welcome";
import {uploadFile} from "./server/upload";
import uploadMiddleware from "./server/uploadMiddleware";

const app = express();

app.use(express.json())

app.get("/", welcome)
app.post("/upload", uploadMiddleware, uploadFile)
app.post("/process/<object_id>", welcome)
app.patch("/results/<object_id>", welcome)

const port = getPort();

app.listen(port, () => console.log(`Fetcher listening on port ${port}`));
