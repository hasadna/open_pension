import ReportQuery from "types/report-query";
import {DownloadLinks} from "types/download-links";
import { CmaGovApiClient } from "clients/cma-api-client";
import { CmsService } from "./cms-services";
import ReportRow from "../types/report-row";

const cmaClient = new CmaGovApiClient();
const cmsService = new CmsService();

/**
 * Download files from a give links and send to the to the CMS.
 *
 * @param links
 *  List of links.
 */
export function downloadLinks(links: any) {
    links.map(async (item: any) => {
        try {
            console.log(`Downloading ${item['address']}`);
            const file = await cmaClient.downloadDocument(item['address'], item['documentId']);

            try {
                console.log(`Sending file ${item['address']} to the CMS`);
                await cmsService.sendFile(item['address'], file, item['documentId']);
            } catch (e) {
                console.error(`Error while sending the file ${item['documentId']}: ${e.message}`)
            }
        } catch (e) {
            console.error(`Error while downloading the file ${item['address']}: ${e.message}`)
        }
    })
}

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
            console.log(`Sending the link ${address}`);
            return {address: address, documentId: row['DocumentId']};
        });

        Promise.all(links).then(async (links) => {
            console.log('All files were processes')
            // For the first time, collect only 100.
            downloadLinks(links.splice(0, 100));
        })

        return {links: [`Amount of collected files: ${links.length}`], errors: []};
    } catch (error) {
        return {links: [], errors: [error.message]};
    }
}
