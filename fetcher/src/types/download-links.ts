import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Company {
  @Field(type => String)
  ParentCorpLegalId: string;

  @Field(type => String)
  ParentCorpName: string;
}

@ObjectType()
export class DownloadLinks {
  @Field(type => [String])
  links: string[];
}
