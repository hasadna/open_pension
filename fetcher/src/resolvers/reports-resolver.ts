import {Arg, Query, Resolver, Mutation} from "type-graphql";
import {ReportQuery, FilesCollect} from "types/report-query";
import {DownloadLinks, SystemField, ReportType, PeriodRanges} from "types/download-links";
import {collectFiles, downloadReports} from "services/reports-service";
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

    @Mutation(returns => DownloadLinks)
    async completeFilesCollecting(@Arg("query") query: FilesCollect): Promise<DownloadLinks> {
        return collectFiles(query);
    }
}
