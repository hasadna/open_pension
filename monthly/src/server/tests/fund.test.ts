import {prisma} from '../context';
import {createTestingServer, sendQuery} from "./testingServer";
import {fundsQuery} from "./testingQueries";

describe('Funds', () => {
  let testingServer;
  beforeAll(() => {
    testingServer = createTestingServer();
  });

  it('Send query when there no funds', async () => {
    const {data: {fundNames}} = await sendQuery(fundsQuery, testingServer);
    expect(fundNames).toStrictEqual([]);
  });

  it('Send query when there is a single fund', async () => {
    const {ID, label} = await prisma.fundName.create({
      data: {
        label: 'name',
      }
    });
    const {data: {fundNames: [fundName]}} = await sendQuery(fundsQuery, testingServer);
    expect(fundName.ID).toBe(ID);
    expect(fundName.label).toBe(label);
  });

  it('Send query when there are two funds', async () => {
    await prisma.fundName.createMany({
      data: [{label: 'first fund'}, {label: 'second fund'}]
    });

    const {data: {fundNames: [firstFund, secondFund]}} = await sendQuery(fundsQuery, testingServer);
    expect(firstFund.label).toBe('first fund');
    expect(secondFund.label).toBe('second fund');

    expect(firstFund.ID).not.toBeNull();
    expect(secondFund.ID).not.toBeNull();
  });
});
