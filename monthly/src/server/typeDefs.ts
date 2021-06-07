import {gql} from "apollo-server";

export default gql`
  type Row {
    id:                             Int
    file:                           File
    created:                        String
    id_guf:                         Int

    MANAGER_ID:                     Int
    ALPHA_SHNATI:                   Float
    SHARP_RIBIT_HASRAT_SIKUN:       Float
    STIAT_TEKEN_60_HODASHIM:        Float
    STIAT_TEKEN_36_HODASHIM:        Float
    TSUA_SHNATIT_MEMUZAAT_5_SHANIM: Float
    TSUA_SHNATIT_MEMUZAAT_3_SHANIM: Float
    TSUA_MITZTABERET_60_HODASHIM:   Float
    TSUA_MITZTABERET_36_HODASHIM:   Float
    TSUA_MEMUZAAT_60_HODASHIM:      Float
    TSUA_MEMUZAAT_36_HODASHIM:      Float
    TSUA_MITZT_MI_THILAT_SHANA:     Float
    YITRAT_NCHASIM_LSOF_TKUFA:      Float
    TSUA_NOMINALIT_BRUTO_HODSHIT:   Float
  }

  type File {
    id:                 Int
    storageId:          Int
    filename:           String
    path:               String
    created:            String
    status:             String
    error:              String
  }

  type InsuranceType {
    id: Int
    title: String
  }

  type InvestmentType {
    id: Int
    title: String
  }

  type Body {
    id: Int
    title: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    rows: [Row],
    files: [File],
    insuranceTypes: [InsuranceType],
    investmentTypes: [InvestmentType],
    bodies: [Body],
  }
`;
