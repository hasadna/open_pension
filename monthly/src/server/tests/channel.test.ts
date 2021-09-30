// import {prisma} from '../context';

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

  it('Send query when there is a single channel', () => {
    expect(1).toBe(1);
  });

  it('Send query when there are two channels', () => {
    expect(1).toBe(1);
  });
});
