import axios, {AxiosInstance} from "axios";
import fs from "fs";
import os from "os";
import path from "path";
import ReportRow from "types/report-row";
import ReportQuery from "types/report-query";
import {BASE_URL, DOWNLOAD_EXTENSION, DOWNLOAD_ROUTE, METADATA_ROUTE, REPORTS_ROUTE} from "consts";

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

    let payload: any = {
      corporation: query.Company == "" ? null : query.Company,
      systemField: query.SystemField ? null : query.SystemField,
      reportType: query.ReportType? null : query.SystemField,

      fromQuarter: query.FromYearPeriod.Quarter,
      fromYear: query.FromYearPeriod.Year,
      toQuarter: query.ToYearPeriod.Quarter,
      toYear: query.ToYearPeriod.Year,

      statusReport: 1,
      investmentName: null,
      reportFromDate: null,
      reportToDate: null,
    }

    const response = await this.api.post(REPORTS_ROUTE, payload);
    return response.data;
  }

  async downloadDocument(report: ReportRow): Promise<string> {
    const response = await this.api.get(DOWNLOAD_ROUTE, {
      params: {
        IdDoc: report.DocumentId,
        extention: DOWNLOAD_EXTENSION
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
