import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SystemField {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Label: string;
}

@ObjectType()
export class ReportType {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Label: string;
}

@ObjectType()
export class PeriodRanges {
  @Field(type => [Number])
  Years: number[];

  @Field(type => [Quarter])
  Quarters: Quarter[];
}

@ObjectType()
export class Quarter {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Label: string
}

@ObjectType()
export class DownloadLinks {
  @Field(type => [String])
  links: string[];
}
