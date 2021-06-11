import {join} from 'path';
const readXlsxFile = require('read-excel-file/node');

interface DataFromFile {
  FundID: number,
  ManagingBody: string,
  FundName: string,
  Status: string,
  Channel: string,
  SubChannel: string,
  Type: string,
  PassiveActive: string,
  HomeBase: string,
}

const processRows = (rows: any): DataFromFile[] => {
  const expectedRows: DataFromFile[] = [];

  for (let [FundID, ManagingBody, FundName, Status, Channel, Type, SubChannel, PassiveActive, HomeBase] of rows) {
    expectedRows.push({
      FundID, ManagingBody, FundName, Status, Channel, Type, SubChannel, PassiveActive, HomeBase
    });
  }

  return expectedRows;
};

const getFileRows = async (): Promise<any> => {
  const path = join(process.cwd(), 'src', 'reclamation', 'reclamation.xlsx');
  return await readXlsxFile(path, {sheet: 'גיליון1'});
};

export async function dataFromFile(): Promise<DataFromFile[]> {
  // Read the file.
  const rows = await getFileRows();

  // Iterate over the items and generate a unique data.
  return processRows(rows)
}
