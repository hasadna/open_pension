import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class DownloadLinks {
  @Field(type => [String])
  links: string[];
}