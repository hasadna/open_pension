import {gql} from "apollo-server";

export default gql`

  type BaseMetadata {
    ID: Int
    label: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    channels: [BaseMetadata],
    fundNames: [BaseMetadata],
    managingBodies: [BaseMetadata],
    subChannels: [BaseMetadata],
    lastUpdated: Int,
    missingFundData: [Int]
  }
`;
