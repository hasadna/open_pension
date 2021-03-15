import {processFile} from "./file";
import {join} from "path";
import {ProcessState} from "./interfaces";

export const getPathForFixture = (filename: string): string => join(process.cwd(), 'src', 'lib', 'fixtures', filename);

describe('Testing the file processing', () => {

  it('No processor should be called when passing wrong file name', async () => {
    const {status, payload, message} = await processFile(getPathForFixture('simple_name.xml'));
    expect(status).toBe(ProcessState.Failed);
    expect(payload).toStrictEqual([]);
    expect(message).toBe('There is no matching processor for the file simple_name.xml');
  });

  it('bituah processor: testing processing a file', async() => {
    const {status, payload, message} = await processFile(getPathForFixture('bituachnet_2017_01_type0.xml'));
    expect(status).toBe(ProcessState.Success);
    expect(message).toBeNull();

    const expected = {
      ID_MANAGER: 108,
      ALPHA_SHNATI: 2.16,
      SHARP_RIBIT_HASRAT_SIKUN: 1.15,
      STIAT_TEKEN_36_HODASHIM: 0.95,
      STIAT_TEKEN_60_HODASHIM: 1.01,
      TSUA_MEMUZAAT_36_HODASHIM: 0.32,
      TSUA_MEMUZAAT_60_HODASHIM: 0.45,
      TSUA_MITZT_MI_THILAT_SHANA: -0.1,
      TSUA_MITZTABERET_36_HODASHIM: 12.03,
      TSUA_MITZTABERET_60_HODASHIM: 30.98,
      TSUA_NOMINALIT_BRUTO_HODSHIT: -0.1,
      TSUA_SHNATIT_MEMUZAAT_3_SHANIM: 3.86,
      TSUA_SHNATIT_MEMUZAAT_5_SHANIM: 5.55,
      YITRAT_NCHASIM_LSOF_TKUFA: 90.38057
    };

    expect(expected).toStrictEqual(payload[0]);
  });

  it('gemel processor: Testing file processing', async () => {
    const res = await processFile(getPathForFixture('gemelnet_2017_01_perut.xml'));
    console.log(res);
  });

  it('pensya processor: Testing file process', async () => {
    const res = await processFile(getPathForFixture('pensyanet_2017_01_maslul_klali.xml'));
    console.log(res);
  });
});
