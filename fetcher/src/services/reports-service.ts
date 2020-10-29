import {ReportQuery} from "types/report-query";
import {CmaGovApiClient} from "clients/cma-api-client";
import ReportRow from "../types/report-row";
import {KafkaClient} from "../clients/kafka-client";

const cmaClient = new CmaGovApiClient();


export async function downloadReports(query: ReportQuery) {
    try {
        const errors = cmaClient.validateQuery(query);

        console.error("Error while query files", errors);

        if (errors) {
            if (Object.keys(errors).length > 0) {
                return {links: [], errors: errors}
            }
        }

        console.log('No errors, collect the links.');

        const reports = await cmaClient.getReports(query);
        const kafka = new KafkaClient();

        reports.map(async (row: ReportRow) => {
            await kafka.sendMessage(`https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=${row['DocumentId']}&extention=XLSX`);
        });

    } catch (error) {
        console.error(error);
        return {links: [], errors: [error.message]};
    }
}
