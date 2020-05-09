import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import { CmaGovApiClient } from "clients/cma-api-client";
import { CmsService } from "./cms-services";
import ReportRow from "../types/report-row";

const cmaClient = new CmaGovApiClient();
const cmsService = new CmsService();

export async function downloadReports(query: ReportQuery): Promise<DownloadLinks> {
    try {
        const errors = cmaClient.validateQuery(query);

        if (errors) {
            if (Object.keys(errors).length > 0) {
                return {links: [], errors: errors}
            }
        }

        let reports = await cmaClient.getReports(query);

        const links: any = reports.map(async (row: ReportRow) => {
            const address = `https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`;
            await cmsService.sendLinkAddress(address);
            console.log(`Downloading ${address}`);
            return {address: address, documentId: row['DocumentId']};
        });

        Promise.all(links).then(async (links) => {
            // For the first time, collect only 100.
            links.splice(0, 100).map(async (item: any) => {
                try {
                    console.log(`Downloading ${item['address']}`);
                    const file = await cmaClient.downloadDocument(item['address'], item['documentId']);

                    console.log(`Sending file ${item['address']} to the CMS`);
                    await cmsService.sendFile(item['address'], file, item['documentId']);
                } catch (e) {
                    console.error(e)
                    return;
                }
            })
        })

        return {links: [`Amount of collected files: ${links.length}`], errors: []};
    } catch (error) {
        return {links: [], errors: [error.message]};
    }
}
