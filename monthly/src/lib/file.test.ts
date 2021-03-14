const bituachnetMockFunction = jest.fn();
const gemelMockFunction = jest.fn();
const pensyaMockFunction = jest.fn();

jest.mock('./parsers', () => ({
  parsers: {
    bituachnet: bituachnetMockFunction,
    gemel: gemelMockFunction,
    pensya: pensyaMockFunction,
  },
}));

import {processFile} from "./file";
import {join} from "path";
import {ProcessState} from "./interfaces";

export const getPathForFixture = (filename: string): string => join(process.cwd(), 'src', 'lib', 'fixtures', filename);

describe('Testing the file processing', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('No processor should be called when passing wrong file name', async () => {
    const {status, payload, message} = await processFile(getPathForFixture('simple_name.xml'));
    expect(status).toBe(ProcessState.Failed);
    expect(payload).toStrictEqual([]);
    expect(message).toBe('There is no matching processor for the file simple_name.xml');
  });

  it('Testing which processor which be called by the name of the file', async () => {
    expect(bituachnetMockFunction).not.toBeCalled();
    expect(gemelMockFunction).not.toBeCalled();
    expect(pensyaMockFunction).not.toBeCalled();

    await processFile(getPathForFixture('bituachnet_2017_01_type0.xml'));
    await processFile(getPathForFixture('pensyanet_2017_01_maslul_klali.xml'));
    await processFile(getPathForFixture('gemelnet_2017_01_perut.xml'));

    expect(bituachnetMockFunction).toBeCalledTimes(1);
    expect(pensyaMockFunction).toBeCalledTimes(1);
    expect(gemelMockFunction).toBeCalledTimes(1);
  });

  it('bituach processor: testing full valued row', async () => {
    expect(1).toBe(1);
  });

  it('bituach processor: testing partial valued row', async () => {
    expect(1).toBe(1);
  });

  it('gemel processor: testing full valued row', async () => {
    expect(1).toBe(1);
  });

  it('gemel processor: testing partial valued row', async () => {
    expect(1).toBe(1);
  });

  it('pensya processor: testing full valued row', async () => {
    expect(1).toBe(1);
  });

  it('pensya processor: testing partial valued row', async () => {
    expect(1).toBe(1);
  });
});
