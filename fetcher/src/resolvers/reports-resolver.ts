import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Mutation
} from "type-graphql";

import ReportQuery from "types/report-query";
import DownloadLinks from "types/download-links";

import CmaGovApiClient from "clients/cma-api-client";
import { streamToS3 } from "clients/s3-client";

const cmaClient = new CmaGovApiClient();

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
    try {
      const reports = await cmaClient.getReports(query);

      const links = await Promise.all(
        reports
          .slice(0, 2) // only taking 2 rows for testing
          .map(async row => {
            const fileStream = await cmaClient.downloadDocument(reports[0]);
            const downloadLink = await streamToS3(row, fileStream);
            return downloadLink;
          })
      );

      return { links };
    } catch (error) {
      console.error(error);
      return { links: [] };
    }
  }
}
