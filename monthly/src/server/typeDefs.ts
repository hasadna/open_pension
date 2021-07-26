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

  type TracksInfo {
    fundNumber: Int
    fundName: String,
    yearlyRevenue: Int
    balance: Int
    yearlyBalance: Int
    threeYearsAverageBalance: Int
    fiveYearsAverageBalance: Int
    sharp: Int
  }

  input PerformanceInput {
    fundId: [Int],
    channel: [Int],
    managingBody: [Int],
    timePeriod: TimePeriod
  }

  type PerformanceOutput {
    # Sicne the graph has an knowkn data structure the resolver returns it as a
    # json string. The consumer will need to handle it and parse the string.
    graph: String,
    graphData: String,
    legends: [String]
    tracksInfo: [TracksInfo],
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
    performance(input: PerformanceInput!): PerformanceOutput,
  }
`;
