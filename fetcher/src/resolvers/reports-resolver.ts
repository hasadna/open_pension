import {Query, Resolver} from "type-graphql";
import {ReportQuery} from "types/report-query";
import {SystemField, ReportType, PeriodRanges} from "types/download-links";
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
}
