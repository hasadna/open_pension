import {createTestingServer, sendQuery} from "./testingServerUtils";
import {subChannelQuery} from "./testingQueries";
import {prisma} from "../context";

describe('Sub channels', () => {
  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer();
  });

  it('Send query when there no sub channels', async () => {
    const {data: {subChannels: subChannels}} = await sendQuery(subChannelQuery, testingServer);
    expect(subChannels).toStrictEqual([]);
  });

  it('Send query when there is a single sub channel', async () => {
    const {ID, label} = await prisma.subChannel.create({
      data: {
        label: 'Label',
      }
    });

    const {data: {subChannels: [subChannel]}} = await sendQuery(subChannelQuery, testingServer);
    expect(subChannel.ID).toBe(ID);
    expect(subChannel.label).toBe(label);
  });

  it('Send query when there are two sub channels', async () => {
    await prisma.subChannel.createMany({data: [
        {label: 'First sub channel'},
        {label: 'Second sub channel'}
      ]}
    );

    const {data: {subChannels: [firstSubChannel, secondSubChannel]}} = await sendQuery(subChannelQuery, testingServer);

    expect(firstSubChannel.ID).not.toBeNull();
    expect(firstSubChannel.label).toBe('First sub channel');

    expect(secondSubChannel.ID).not.toBeNull();
    expect(secondSubChannel.label).toBe('Second sub channel');
  });
});
