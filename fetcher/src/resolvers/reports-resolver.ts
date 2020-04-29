import {Arg, Query, Resolver, Mutation} from "type-graphql";
import ReportQuery from "types/report-query";
import {DownloadLinks, SystemField, ReportType, PeriodRanges} from "types/download-links";
import {downloadReports} from "services/reports-service";
import {getPeriodRanges, getReportsType, getSystemFields} from "services/query-services";

@Resolver(of => ReportQuery)
export default class {
    @Query(returns => [SystemField])
    systemField() {
        return getSystemFields();
    }

    @Query(returns => [ReportType])
    reportsType() {
        return getReportsType();
    }

    @Query(returns => PeriodRanges)
    fromYearRange() {
        return getPeriodRanges();
    }

    @Query(returns => PeriodRanges)
    toYearRange() {
        return getPeriodRanges();
    }

    @Mutation(returns => DownloadLinks)
    async downloadReports(@Arg("query") query: ReportQuery): Promise<DownloadLinks> {
        return downloadReports(query);
    }
}
