import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import { CmaGovApiClient } from "clients/cma-api-client";
import { KafkaClient } from "clients/kafka-client";
import CmsService from "./cms-services";

const cmaClient = new CmaGovApiClient();
const cmsService = new CmsService();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
    try {
        const errors = cmaClient.validateQuery(query);

        if (Object.keys(errors).length > 0) {
            return {links: [], errors: errors}
        }

        let reports = await cmaClient.getReports(query);

        // todo: add validation to the values.
        const links: any = reports.map(async (row: any) => {
            // todo: send a post message to Drupal.
            const address = `https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`;

            cmsService.sendLinkAddress(address);

            // todo: send the address to Drupal.
            return address;
        });

        // todo: iterate over the files we collected.
        links.map(async (item: string) => {
            const file = await cmaClient.downloadDocument(item);
            await cmsService.sendFile(item, file);
        });

        return {links: links, errors: []};
    } catch (error) {
        return {links: [], errors: [error.message]};
    }
}
