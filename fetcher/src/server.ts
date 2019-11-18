import express from "express";
import 'express-async-errors';
require('dotenv').config();

import CmaGovApiClient from "./cma-api-client";
import { streamToS3 } from "./s3client";
import { ReportQuery } from "types/report-query";

const app = express();
const port = 3000;

const cmaClient = new CmaGovApiClient();

app.get("/reports", async (req, res) => {
  const query: ReportQuery = parseReportRequest(req.query);
  const reports = await cmaClient.getReports(query);

  const downloadLinks = await Promise.all(reports
    .slice(0, 5) // only taking 5 rows for testing 
    .map(async (row) => {
      const fileStream = await cmaClient.downloadDocument(reports[0]);
      const downloadLink = await streamToS3(row, fileStream);
      return downloadLink;
    }));
  
  res.send(downloadLinks);
});



function parseReportRequest(queryString: any): ReportQuery {
  ['fromQuarter', 'toQuarter', 'year']
  .filter(key => !queryString[key])
  .forEach(key => { throw new Error(`Request must include ${key}`) });

  return {
    fromQuarter: queryString.fromQuarter,
    toQuarter: queryString.toQuarter,
    fromYear: queryString.year,
    toYear: queryString.year,
    statusReport: 1 // הוגש
  };
}

app.listen(port, () => console.log(`Fetcher listening on port ${port}!`));
