import {gql} from "apollo-server";

export default gql`
  type Row {
    id:                              Int
    file:                            File
    created:                         String
    id_guf:                          Int
    shem_guf:                        String
    taarich_hafakat_hadoch:          String
    id_hevra:                        Int
    tkufat_hakama:                   String
    tkufat_divuach:                  String
    tsua_mitz_mi_thilat_hashana:     Float
    tsua_hodshit:                    Float
    tsua_memuzaat36_hodashim:        Float
    tsua_memuzaat60_hodashim:        Float
    tsua_mitztaberet36_hodashim:     Float
    tsua_mitztaberet60_hodashim:     Float
    tsua_shnatit_memuzaat3_shanim:   Float
    tsua_shnatit_memuzaat5_shanim:   Float
    stiat_teken36_hodashim:          Float
    stiat_teken60_hodashim:          Float
    yit_nchasim_bfoal:               Float
    shiur_d_nihul_nechasim:          Float
    shiur_d_nihul_hafkadot:          Float
    sharp_tsua_hezyonit_anaf:        Float
    sharp_ribit_hasrat_sikun:        Float
    alpha_shnati:                    Float
    beta_ta100:                      Float
    beta_agach_kontzerniot_tzmudot:  Float
    beta_agach_mem_lo_tzmudot:       Float
    beta_agach_memshaltiot_tzmudot:  Float
    beta_hutz_laaretz:               Float
    r_squared:                       Float
    yahas_nezilut:                   Float
    num_hevra:                       Int
    taarich_sium_peilut:             String
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    rows: [Row],
    files: [File]
  }
`;