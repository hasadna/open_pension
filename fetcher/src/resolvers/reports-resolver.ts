import { Arg, Query, Resolver, Mutation } from "type-graphql";

import ReportQuery from "types/report-query";
import DownloadLinks from "types/download-links";

import { downloadReports } from "services/reports-service";

@Resolver(of => ReportQuery)
export default class {
  @Query(returns => String)
  async test() {
    return "ok";
  }

  @Mutation(returns => DownloadLinks)
  async downloadReports(
    @Arg("query") query: ReportQuery
  ): Promise<DownloadLinks> {
    return downloadReports(query);
  }
}
