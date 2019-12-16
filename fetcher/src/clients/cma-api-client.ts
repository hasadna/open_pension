import axios, { AxiosInstance } from "axios";
import fs from "fs";
import os from "os";
import path from "path";

import ReportRow from "types/report-row";
import ReportQuery from "types/report-query";

const BASE_URL = "https://employersinfocmp.cma.gov.il/api/PublicReporting";
const METADATA_ROUTE = "/GetPublicReportsSearchData";
const REPORTS_ROUTE = "/GetPublicReports";
const DOWNLOAD_ROUTE = "/downloadFiles";
const DOWNLOAD_EXTENSTION = "xlsx";

export default class CmaGovApiClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL
    });
  }

  async getReportsMetadata() {
    console.log("Getting metadata");
    const response = await this.api.get(METADATA_ROUTE);
    return response.data;
  }

  async getReports(query: ReportQuery): Promise<ReportRow[]> {
    console.log("Getting reports list");
    const response = await this.api.post(REPORTS_ROUTE, query);
    console.log(`Got ${response.data.length} reports`);
    return response.data;
  }

  async downloadDocument(report: ReportRow): Promise<string> {
    console.log("Downloading document", report.DocumentId);
    const response = await this.api.get(DOWNLOAD_ROUTE, {
      params: {
        IdDoc: report.DocumentId,
        extention: DOWNLOAD_EXTENSTION
      },
      responseType: "stream"
    });

    return new Promise((resolve, reject) => {
      const downloadStream = response.data;
      const filename = report.DocumentId + "." + report.fileExt;
      const destination = path.join(os.tmpdir(), filename);
      downloadStream
        .on("end", () => resolve(destination))
        .on("error", reject)
        .pipe(fs.createWriteStream(destination));
    });
  }
}
