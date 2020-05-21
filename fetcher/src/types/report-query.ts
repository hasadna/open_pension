import {Field, Int, InputType} from "type-graphql";

@InputType()
class YearPeriod {
    @Field(type => Number)
    Year: number;

    @Field(type => String)
    Quarter: string;
}

@InputType()
export class ReportQuery {
    @Field(type => String, { nullable: true })
    SystemField: string;

    @Field(type => String, { nullable: true })
    ReportType: string;

    @Field(type => YearPeriod, { nullable: true })
    FromYearPeriod: YearPeriod;

    @Field(type => YearPeriod, { nullable: true })
    ToYearPeriod: YearPeriod;
}

@InputType()
export class FilesCollect {
    @Field(type => [String])
    Urls: [string];
}
