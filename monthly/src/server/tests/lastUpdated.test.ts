import {
  createFile,
  createRow,
  createTestingServer,
  sendQuery
} from "./testingServerUtils";
import {lastUpdateQuery} from "./testingQueries";

describe('Last updated', () => {
  let testingServer;

  beforeAll(async () => {
    testingServer = createTestingServer();
  });

  it('Send query when there no records', async () => {
    const {data: {lastUpdated}} = await sendQuery(lastUpdateQuery, testingServer);
    expect(lastUpdated).toBeNull();
  });

  it('Send query when there is a single record', async () => {
    const file = await createFile();
    const row = await createRow({TKUFAT_DIVUACH: new Date(`2017-01-01T00:00:00.000Z`), file});
    const dateObjectFromRow = Math.round(row.TKUFAT_DIVUACH.getTime() / 1000)
    const {data: {lastUpdated}} = await sendQuery(lastUpdateQuery, testingServer);

    expect(dateObjectFromRow).toBe(lastUpdated);
  });

  it('Send query when there are two records', async () => {
    const file = await createFile();

    const createRowAndGetTimeObject = async (TKUFAT_DIVUACH) => {
      const row = await createRow({TKUFAT_DIVUACH, file});
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
