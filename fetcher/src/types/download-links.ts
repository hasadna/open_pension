import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Company {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Label: string;
}

@ObjectType()
export class SystemField {
  @Field(type => String)
  Id: string;

  @Field(type => String)
  Label: string;
}

@ObjectType()
export class DownloadLinks {
  @Field(type => [String])
  links: string[];
}
