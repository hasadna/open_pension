import {gql} from "apollo-server";

export default gql`

  type BaseMetadata {
    ID: Int
    label: String
  }

  enum TimePeriod {
    THREE_MONTHS
    SIX_MONTHS
    YEAR_START
    LAST_TWELVE_MONTHS
    LAST_THREE_YEARS
    LAST_FIVE_YEARS
  }

  input PerformanceInput {
    channel: Int,
    subChannel: Int,
    bodies: [Int],
    timePeriod: TimePeriod
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
    missingFundData: [Int],
    performance(input: PerformanceInput!): String,
  }
`;
