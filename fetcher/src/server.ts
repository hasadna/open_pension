import express from "express";
import CmaGovApiClient, { mimeType } from "./cma-api-client";

const app = express();
const port = 3000;

const cmaClient = new CmaGovApiClient();

app.get("/", async (req, res) => {
  const reports = await cmaClient.getReports();
  const fileStream = await cmaClient.downloadDocument(reports[0]);
  res.setHeader("content-type", mimeType);
  fileStream.pipe(res);
});

app.listen(port, () => console.log(`Fetcher listening on port ${port}!`));
