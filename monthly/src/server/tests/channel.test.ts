import {prisma} from '../context';
import {createTestingServer, sendQuery} from "./testingServer";
import {channelsQuery} from "./testingQueries";

describe('Channel', () => {

  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer();
  });

  it('Send query when there no channels', async () => {
    const {data: {channels: channels}} = await sendQuery(channelsQuery, testingServer);
    expect(channels).toStrictEqual([]);
  });

  it('Send query when there is a single channel', async () => {
    const {ID, label} = await prisma.channel.create({
      data: {
        label: 'Label',
        prefix: 'l'
      }
    });

    const {data: {channels: [channel]}} = await sendQuery(channelsQuery, testingServer);
    expect(channel.ID).toBe(ID);
    expect(channel.label).toBe(label);
  });

  it('Send query when there are two channels', async () => {
    await prisma.channel.createMany({data: [
        {label: 'First label', prefix: 'fl'},
        {label: 'Second label', prefix: 'sl'}
      ]}
    );

    const {data: {channels: [firstChannel, secondChannel]}} = await sendQuery(channelsQuery, testingServer);

    expect(firstChannel.ID).not.toBeNull();
    expect(firstChannel.label).toBe('First label');

    expect(secondChannel.ID).not.toBeNull();
    expect(secondChannel.label).toBe('Second label');
  });
});
