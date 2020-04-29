import {isDev} from "services/config-service";

import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";

import CmaGovApiClient from "clients/cma-api-client";
import KafkaClient from "clients/kafka-client";
import {uploadFile} from "clients/google-storage-client";
import ProcessorClient from "clients/processor-client";

const cmaClient = new CmaGovApiClient();
const kafkaClient = new KafkaClient();
const processorClient = new ProcessorClient();

export async function downloadReports(
    query: ReportQuery
): Promise<DownloadLinks> {
    try {
        let reports = await cmaClient.getReports(query);

        // todo: add validation to the values.
        //  Should get the amount of downloaded files.

        const links = await Promise.all(
            reports.map(async row => {
                const localFile = await cmaClient.downloadDocument(row);
                if (isDev()) {
                    return `file://${localFile}`;
                }

                return processorClient.sendFile(localFile);
                // return uploadFile(localFile);
            })
        );

        // await kafkaClient.sendMessage(links);

        return {links};
    } catch (error) {
        console.error(error);
        return {links: []};
    }
}
