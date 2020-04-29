import {Arg, Query, Resolver, Mutation} from "type-graphql";
import ReportQuery from "types/report-query";
import {DownloadLinks, Company, SystemField} from "types/download-links";
import {downloadReports} from "services/reports-service";
import {getCompanies, getSystemFields} from "services/query-services";

@Resolver(of => ReportQuery)
export default class {
    @Query(returns => [Company])
    companies() {
        return getCompanies();
    }

    @Query(returns => [SystemField])
    systemField() {
        return getSystemFields();
    }

    @Mutation(returns => DownloadLinks)
    async downloadReports(
        @Arg("query") query: ReportQuery
    ): Promise<DownloadLinks> {
        return downloadReports(query);
    }
}
