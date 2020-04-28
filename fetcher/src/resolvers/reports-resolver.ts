import {Arg, Query, Resolver, Mutation} from "type-graphql";
import ReportQuery from "types/report-query";
import {DownloadLinks, Company} from "types/download-links";
import {downloadReports} from "services/reports-service";
import {getCompanies} from "services/query-services";

@Resolver(of => ReportQuery)
export default class {
    @Query(returns => [Company])
    async companies() {
        return getCompanies()
    }

    @Mutation(returns => DownloadLinks)
    async downloadReports(
        @Arg("query") query: ReportQuery
    ): Promise<DownloadLinks> {
        return downloadReports(query);
    }
}
