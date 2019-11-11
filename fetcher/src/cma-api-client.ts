import axios, { AxiosInstance } from "axios";
import fs, { ReadStream } from "fs";

import { ReportRow } from "./types/report-row";
import { ReportQuery } from "./types/report-query";

const BASE_URL = "https://employersinfocmp.cma.gov.il/api/PublicReporting";
const METADATA_ROUTE = "/GetPublicReportsSearchData";
const REPORTS_ROUTE = "/GetPublicReports";
const DOWNLOAD_ROUTE = "/downloadFiles";
const DOWNLOAD_EXTENSTION = "xlsx";

const log = console.log.bind(console);

export const mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export default class CmaGovApiClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL
    });
  }

  // NOT USED (yet?)
  // async getReportsMetadata() {
  //   log("Getting metadata");
  //   const response = await this.api.get(METADATA_ROUTE);
  //   return response.data;
  // }

  async getReports(): Promise<ReportRow[]> {
    log("Getting reports list");
    const query: ReportQuery = {
      fromQuarter: 3,
      fromYear: 2019,
      toQuarter: 3,
      toYear: 2019,
      statusReport: 1 // הוגש
    };
    const response = await this.api.post(REPORTS_ROUTE, query);
    log(`Got ${response.data.length} reports`);
    return response.data;
  }

  async downloadDocument(report: ReportRow): Promise<ReadStream> {
    log("Downloading document", report.DocumentId);
    const response = await this.api.get(DOWNLOAD_ROUTE, {
      params: {
        IdDoc: report.DocumentId,
        extention: DOWNLOAD_EXTENSTION
      },
      responseType: "stream"
    });

    return response.data;
  }
}
