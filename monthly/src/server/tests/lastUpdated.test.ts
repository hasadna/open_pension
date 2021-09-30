import {createTestingServer, sendQuery} from "./testingServer";
import {lastUpdateQuery} from "./testingQueries";
import {prisma} from "../context";

describe('Last updated', () => {
  let testingServer;
  let file;

  beforeAll(async () => {
    testingServer = createTestingServer();
    file = await prisma.file.create({
      data: {
        filename: 'dummy_file.xml',
        storageID: 0,
        path: '',
        error: "",
        status: 'Ready',
      },
    });
  });

  const createRow = async({TKUFAT_DIVUACH}) => prisma.row.create({
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
    }
  });

  it('Send query when there no records', async () => {
    const {data: {lastUpdated}} = await sendQuery(lastUpdateQuery, testingServer);
    expect(lastUpdated).toBeNull();
  });

  it('Send query when there is a single record', async () => {
    const row = await createRow({TKUFAT_DIVUACH: new Date(`2017-01-01T00:00:00.000Z`)});
    const dateObjectFromRow = Math.round(row.TKUFAT_DIVUACH.getTime() / 1000)
    const {data: {lastUpdated}} = await sendQuery(lastUpdateQuery, testingServer);

    expect(dateObjectFromRow).toBe(lastUpdated);
  });

  it('Send query when there are two records', async () => {
    const createRowAndGetTimeObject = async (TKUFAT_DIVUACH) => {
      const row = await createRow({TKUFAT_DIVUACH});
      return Math.round(row.TKUFAT_DIVUACH.getTime() / 1000)
    };

    const dateObjectFromFirstRow = await createRowAndGetTimeObject(`2017-01-01T00:00:00.000Z`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const dateObjectFromSecondRow = await createRowAndGetTimeObject(`2019-01-01T00:00:00.000Z`);

    const {data: {lastUpdated}} = await sendQuery(lastUpdateQuery, testingServer);
    expect(dateObjectFromFirstRow).not.toBe(lastUpdated);
    expect(dateObjectFromSecondRow).toBe(lastUpdated);
  });
});
