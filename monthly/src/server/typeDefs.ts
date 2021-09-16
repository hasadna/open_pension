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
    yearlyRevenue: Float
    balance: Float
    threeYearsAverageBalance: Float
    fiveYearsAverageBalance: Float
    sharp: Float
  }

  input PerformanceInput {
    channel: Int
    subChannel: Int,
    bodies: [Int],
    timePeriod: TimePeriod
  }

  type PerformanceOutput {
    # Sicne the graph has an knowkn data structure the resolver returns it as a
    # json string. The consumer will need to handle it and parse the string.
    graph: String,
    graphData: String,
    tracksInfo: [TracksInfo],
  }

  type FileRows {
    row_ID: Int,
    MANAGER_ID: Int,
    ALPHA_SHNATI: Float,
    SHARP_RIBIT_HASRAT_SIKUN: Float,
    STIAT_TEKEN_60_HODASHIM: Float,
    STIAT_TEKEN_36_HODASHIM: Float,
    TSUA_SHNATIT_MEMUZAAT_5_SHANIM: Float,
    TSUA_SHNATIT_MEMUZAAT_3_SHANIM: Float,
    TSUA_MITZTABERET_60_HODASHIM: Float,
    TSUA_MITZTABERET_36_HODASHIM: Float,
    TSUA_MEMUZAAT_60_HODASHIM: Float,
    TSUA_MEMUZAAT_36_HODASHIM: Float,
    TSUA_MITZT_MI_THILAT_SHANA: Float,
    YITRAT_NCHASIM_LSOF_TKUFA: Float,
    TSUA_NOMINALIT_BRUTO_HODSHIT: Float,
    TKUFAT_DIVUACH: String,
    missingReclamationData: Boolean,
    managerMetadata: ManagerMetadata
  }

  type ManagerMetadata {
    status: String,
    channel: String,
    subChannel: String,
    fundName: String,
    type: String,
    passiveActive: String,
    homebase: String,
    managingBody: String,
  }

  type FileInfo {
    error: String,
    numberOfRows: Int,
    fileRows: [FileRows]
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
    fileInfo(storageID: Int): FileInfo
  }
`;
