import {createTestingServer, sendQuery} from "./testingServer";
import {mangingBodyQuery} from "./testingQueries";
import {prisma} from "../context";

describe('Managing body', () => {

  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer();
  });

  it('Send query when there no managing bodies', async () => {
    const {data: {managingBodies: managingBody}} = await sendQuery(mangingBodyQuery, testingServer);
    expect(managingBody).toStrictEqual([]);
  });

  it('Send query when there is a single managing body', async () => {
    const {ID, label} = await prisma.managingBody.create({
      data: {
        label: 'managing body',
      }
    });

    const {data: {managingBodies: [managingBody]}} = await sendQuery(mangingBodyQuery, testingServer);
    expect(managingBody.ID).toBe(ID);
    expect(managingBody.label).toBe(label);
  });

  it('Send query when there are two managing bodies', async () => {
    await prisma.managingBody.createMany({
      data: [{label: 'first managing body'}, {label: 'second managing body'}]
    });

    const {data: {managingBodies: [firstManagingBody, secondManagingBody]}} = await sendQuery(mangingBodyQuery, testingServer);
    expect(firstManagingBody.label).toBe('first managing body');
    expect(secondManagingBody.label).toBe('second managing body');

    expect(firstManagingBody.ID).not.toBeNull();
    expect(secondManagingBody.ID).not.toBeNull();
  });
});
