import axios, {AxiosInstance} from "axios";
import fs from "fs";
import os from "os";
import path from "path";
import ReportRow from "types/report-row";
import ReportQuery from "types/report-query";
import {BASE_URL, DOWNLOAD_EXTENSION, DOWNLOAD_ROUTE, REPORTS_ROUTE} from "consts";
import {safeGet} from "services/config-service";
import {getPeriodRanges, getReportsType, getSystemFields} from "services/query-services";

export class CmaGovApiClient {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL
        });
    }

    async getReports(query: ReportQuery): Promise<ReportRow[]> {

        let payload = {
            "corporation": null,

            "fromQuarter": query.FromYearPeriod.Quarter == "" ? 1 : query.FromYearPeriod.Quarter,
            "fromYear": query.FromYearPeriod.Year,
            "toQuarter": query.ToYearPeriod.Quarter == "" ? 1 : query.FromYearPeriod.Quarter,
            "toYear": query.ToYearPeriod.Year,

            "reportType": query.ReportType,
            "systemField": query.SystemField,

            "statusReport": 1,
            "investmentName": null,
            "reportFromDate": null,
            "reportToDate": null
        };

        const response = await this.api.post(REPORTS_ROUTE, payload);
        return response.data;
    }

    public validateQuery(query: ReportQuery): string[] {
        const errors: any = {};

        if (getSystemFields().map((item: any) => item.Id).indexOf(query.SystemField) === -1) {
            errors['SystemField'] = `'${query.SystemField}' is not allowed`;
        }

        if (getReportsType().map((item: any) => item.Id).indexOf(query.ReportType) === -1) {
            errors['ReportType'] = `'${query.ReportType}' is not allowed`;
        }

        const {Years, Quarters} = getPeriodRanges();

        let periodValidator = (Year: any, Quarter: any) => {
            let PeriodErrors: any = {};

            if (Years.indexOf(Year) === -1) {
                PeriodErrors['Year'] = `'${Year}' is out of range`;
            }

            if (Quarters.map((item: any) => item.Id).indexOf(Quarter) === -1) {
                PeriodErrors['Quarter'] = `'${Quarter}' is out of range`;
            }

            return PeriodErrors;
        }

        let toYearPeriodErrors: any = periodValidator(query.ToYearPeriod.Year, query.ToYearPeriod.Quarter);
        let fromYearPeriodErrors: any = periodValidator(query.FromYearPeriod.Year, query.FromYearPeriod.Quarter);

        if (Object.keys(toYearPeriodErrors).length > 0) {
            errors['ToYearPeriod'] = toYearPeriodErrors;
        }

        if (Object.keys(toYearPeriodErrors).length > 0) {
            errors['FromYearPeriod'] = fromYearPeriodErrors;
        }

        return errors;
    }

    async downloadDocument(DocumentId: string): Promise<string> {
        const response = await this.api.get(DOWNLOAD_ROUTE, {
            params: {
                IdDoc: DocumentId,
                extention: DOWNLOAD_EXTENSION
            },
            responseType: "stream"
        });

        return new Promise((resolve, reject) => {
            let folder_path: string;
            try {
                folder_path = safeGet('HOSTING_TEMP_FILES');
            } catch (e) {
                folder_path = os.tmpdir();
            }

            const downloadStream = response.data;
            const filename = DocumentId + "." + DOWNLOAD_EXTENSION;
            const destination = path.join(folder_path, filename);

            downloadStream
                .on("end", () => resolve(destination))
                .on("error", reject)
                .pipe(fs.createWriteStream(destination));
        });
    }
}
