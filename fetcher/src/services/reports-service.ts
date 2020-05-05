import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import { CmaGovApiClient } from "clients/cma-api-client";
import { KafkaClient } from "clients/kafka-client";

const cmaClient = new CmaGovApiClient();
const kafkaClient = new KafkaClient();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
    try {
        const errors = cmaClient.validateQuery(query);

        if (Object.keys(errors).length > 0) {
            return {links: [], errors: errors}
        }

        let reports = await cmaClient.getReports(query);

        // todo: add validation to the values.
        const links: any = reports.map(async (row: any) => {
            // await cmaClient.downloadDocument(row['DocumentId'])
            return `https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`;
        });

        // try {
        //     await kafkaClient.sendMessage(links);
        // } catch (e) {
        //
        // }

        return {links: links, errors: []};
    } catch (error) {
        return {links: [], errors: [error.message]};
    }
}
