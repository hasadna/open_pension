import { Field, Int, InputType } from "type-graphql";

@InputType()
export default class ReportQuery {
  @Field(type => Int)
  fromQuarter: number;
  @Field(type => Int)
  fromYear: number;
  @Field(type => Int)
  toQuarter: number;
  @Field(type => Int)
  toYear: number;
  @Field(type => Int)
  statusReport: number;

  // TODO: not sure about these types
  // corporation?: any;
  // investmentName?: any;
  // reportFromDate?: any;
  // reportToDate?: any;
  // reportType?: any;
}