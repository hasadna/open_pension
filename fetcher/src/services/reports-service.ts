import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import { CmaGovApiClient } from "clients/cma-api-client";
import { KafkaClient } from "clients/kafka-client";
import CmsService from "./cms-services";
import ReportRow from "../types/report-row";

const cmaClient = new CmaGovApiClient();
const cmsService = new CmsService();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
    try {
        const errors = cmaClient.validateQuery(query);

        if (Object.keys(errors).length > 0) {
            return {links: [], errors: errors}
        }

        let reports = await cmaClient.getReports(query);

        const links: any = reports.map(async (row: ReportRow) => {
            const address = `https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`;
            await cmsService.sendLinkAddress(address);
            return {address: address, documentId: row['DocumentId']};
        });

        Promise.all(links).then(async (links) => {
            links.map(async (item: any) => {
                const file = await cmaClient.downloadDocument(item['address'], item['documentId']);
                await cmsService.sendFile(item['address'], file, item['documentId']);
            })
        })

        return {links: [`file amount: ${links.length}`], errors: []};
    } catch (error) {
        return {links: [], errors: [error.message]};
    }
}
