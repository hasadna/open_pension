import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import CmaGovApiClient from "clients/cma-api-client";
import KafkaClient from "clients/kafka-client";

const cmaClient = new CmaGovApiClient();
const kafkaClient = new KafkaClient();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
    try {
        let reports = await cmaClient.getReports(query);

        // todo: add validation to the values.
        const links: any = reports.map(async (row: any) => {
            await cmaClient.downloadDocument(row['DocumentId'])
            return `https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`;
        });

        await kafkaClient.sendMessage(links);

        return {links: links};
    } catch (error) {
        console.log(error.data);
        return {links: []};
    }
}
