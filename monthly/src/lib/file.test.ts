import {processFile, readFile} from "./file";
import {join} from "path";
import {FileRowInterface, ProcessedBituachXmlFileInterface} from "./interfaces";
import {firstRow, secondRow, emptyRow, incompleteRow} from "./fixtures/bituach_source";
import {fullRow} from "./fixtures/bituach_results";
import {bituachProcess} from "./parsers";

export const getPathForFixture = (filename: string): string => join(process.cwd(), 'src', 'lib', 'fixtures', filename);

describe('Testing the file processing', () => {

  const parseRows = (rows: any[]): FileRowInterface[]=> {
    const emptyRows: ProcessedBituachXmlFileInterface = {
      ROWSET: {
        DESCRIPTION1: ["First description"],
        DESCRIPTION2: ["Second description"],
        ROW: rows,
      }
    };

    return bituachProcess(emptyRows);
  }

  it('readFile: File does not exits', async () => {
    const readFileResults = await readFile(getPathForFixture('file_not_exists.xml'));

    expect(readFileResults).toStrictEqual({
      "message": "The file does not exists",
      "status": false,
    });
  });

  it('readFile: File is not an XML', async () => {
    const readFileResults = await readFile(getPathForFixture('not_xml.txt'));

    expect(readFileResults).toStrictEqual({
      "message": "The file is not an xml file",
      "status": false,
    });
  });

  it('readFile: File is not in the correct format', async () => {
    const readFileResults = await readFile(getPathForFixture('wrong_format.xml'));

    expect(readFileResults.message).toBe('file processed');
    expect(readFileResults.status).toBe(true);
    expect(readFileResults.payload).not.toBe(null);
  });

  it('enrichRawFileObject: Testing processing invalid object', () => {
    // Ignore this one just for testing.
    // @ts-ignore
    const results = bituachProcess({food: 'pizza'});
    expect(results).toBeNull();
  });

  it ('enrichRawFileObject: Testing the process of a complete row', () => {
    const parsedRows = parseRows([firstRow, secondRow]);
    expect(parsedRows).toHaveLength(2);

    const baseSubStringForDates = {
      taarich_hafakat_hadoch: 'Sun Jul 07 2019',
      tkufat_divuach: 'Sun Jan 01 2017',
      taarich_sium_peilut: '',
    };

    parsedRows.map((parsedRow, key) => {
      Object.keys(parsedRow).map((fieldName) => {

        if (Object.keys(baseSubStringForDates).includes(fieldName)) {
          return;
        }

        const expectedValue = parsedRow[fieldName];
        expect(expectedValue).toBe(fullRow[key][fieldName])
      });
    });

    ['taarich_hafakat_hadoch', 'tkufat_divuach'].map((fieldName) => {
      // Going over the first parsed row and validating the date parsing.
      expect(parsedRows[0][fieldName].toDateString().includes(baseSubStringForDates[fieldName])).toBeTruthy();
    });
  });

  it ('enrichRawFileObject: Testing processing an empty row', () => {
    const parsedRows = parseRows([emptyRow]);

    // Validating we can handle empty values of three types - empty string,
    // empty number and empty date.
    const {id_guf, shem_guf, taarich_hafakat_hadoch} = parsedRows[0];

    expect(id_guf).toBe(0);
    expect(shem_guf).toBe("");
    expect(String(taarich_hafakat_hadoch)).toBe('Invalid Date');
  });

  it ('enrichRawFileObject: Testing processing incomplete row', () => {
    const parsedRows = parseRows([incompleteRow]);
    expect(parsedRows).toHaveLength(1);
    const {id_guf, shem_guf} = parsedRows[0];

    expect(id_guf).toBe(5678);
    expect(shem_guf).toBe("");
  });

  it ('processFile: Testing processing a bad file', async () => {
    const results = await processFile(getPathForFixture('wrong_format.xml'));
    expect(results).toBeNull();
  });

  it ('processFile: Testing processing a good file', async () => {
    const results = await processFile(getPathForFixture('valid_xml.xml'));
    expect(results).not.toBeNull();
    expect(results).toHaveLength(150);
  });
});
