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
        //  Should get the amount of downloaded files.
        const links: any = [];

        await Promise.all(
            reports.map(async (row: any) => {
                console.log(row);
                links.push(row)
            })
        );

        await kafkaClient.sendMessage(links);

        return {links: links};
    } catch (error) {
        return {links: []};
    }
}
