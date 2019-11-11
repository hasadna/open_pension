export type ReportQuery = {
  fromQuarter: number;
  fromYear: number;
  toQuarter: number;
  toYear: number;
  statusReport: number;

  // TODO: not sure about these types
  corporation?: any;
  investmentName?: any;
  reportFromDate?: any;
  reportToDate?: any;
  reportType?: any;
};
