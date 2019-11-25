
import CmaGovApiClient from "clients/cma-api-client";
import { streamToS3 } from "clients/s3-client";
import { ReportQuery } from "types/report-query";

const cmaClient = new CmaGovApiClient();

async function handleReportsRequest(req, res) {
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
};

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

export default handleReportsRequest;