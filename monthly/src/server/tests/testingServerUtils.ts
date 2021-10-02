import {createTestClient} from 'apollo-server-testing';
import {server} from '../server';
import {prisma} from "../context";
import {FileStatus} from "../../lib/interfaces";

export const createTestingServer = () => {
  return createTestClient(server);
}

export const sendQuery = async (graphqlQuery, testingServer) => {
  const {query} = testingServer;
  return await query({ query: graphqlQuery });
};

export const createFile = async (fileArguments: {filename?: string, storageID?: number, error?: string, status?: FileStatus} = {}) => {
  const {filename = 'dummy_file.xml', storageID = 0, error = '', status = 'Ready'} = fileArguments;

  return prisma.file.create({
    data: {
      filename, storageID, error, status, path: '',
    },
  });
}

export const createRow = async({TKUFAT_DIVUACH = new Date(), file, override = {}}) => prisma.row.create({
  data: {
    MANAGER_ID: 108,
    ALPHA_SHNATI: 2.16,
    SHARP_RIBIT_HASRAT_SIKUN: 1.15,
    STIAT_TEKEN_36_HODASHIM: 0.95,
    STIAT_TEKEN_60_HODASHIM: 1.01,
    TKUFAT_DIVUACH,
    TSUA_MEMUZAAT_36_HODASHIM: 0.32,
    TSUA_MEMUZAAT_60_HODASHIM: 0.45,
    TSUA_MITZT_MI_THILAT_SHANA: -0.1,
    TSUA_MITZTABERET_36_HODASHIM: 12.03,
    TSUA_MITZTABERET_60_HODASHIM: 30.98,
    TSUA_NOMINALIT_BRUTO_HODSHIT: -0.1,
    TSUA_SHNATIT_MEMUZAAT_3_SHANIM: 3.86,
    TSUA_SHNATIT_MEMUZAAT_5_SHANIM: 5.55,
    YITRAT_NCHASIM_LSOF_TKUFA: 90.38057,
    missingReclamationData: true,
    row_ID: 0,
    file: {connect: {ID: file.ID}},
    ...override
  }
});
