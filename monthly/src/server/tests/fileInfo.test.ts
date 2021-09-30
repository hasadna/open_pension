import {
  createFile,
  createRow,
  createTestingServer,
  sendQuery
} from "./testingServerUtils";
import {fileInfoQuery} from "./testingQueries";

describe('File info', () => {
  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer();
  });

  const validFileInfo = ({data, error, numberOfRows}) => {
    const {fileInfo} = data;
    expect(fileInfo.error).toBe(error);
    expect(fileInfo.numberOfRows).toBe(numberOfRows);
  };

  it('Send query with a non existing storage ID', async () => {
    const {data} = await sendQuery(fileInfoQuery(0), testingServer);
    validFileInfo({data, error: '', numberOfRows: 0})
    expect(data.fileInfo.fileRows).toStrictEqual([]);
  });

  it('Send query when there is a single file', async () => {
    const file = await createFile({storageID: 20});
    const {data} = await sendQuery(fileInfoQuery(20), testingServer);
    expect(data.fileInfo.fileRows).toStrictEqual([]);

    validFileInfo({data, error: '', numberOfRows: 0})

    // Adding rows to the file.
    await Promise.all([
      createRow({file, override: {MANAGER_ID: 20}}),
      createRow({file, override: {MANAGER_ID: 39}})
    ]);

    // Sending the request.
    const {data: {fileInfo}} = await sendQuery(fileInfoQuery(20), testingServer);
    validFileInfo({data: {fileInfo}, error: '', numberOfRows: 2});

    const [firstRow, secondRow] = fileInfo.fileRows;
    expect(firstRow.MANAGER_ID).toBe(20);
    expect(secondRow.MANAGER_ID).toBe(39);
  });

  it('Send query when there are two files', async () => {
    const firstFile = await createFile({storageID: 1});
    await Promise.all([
      createRow({file: firstFile}),
      createRow({file: firstFile})
    ]);

    const secondFile = await createFile({storageID: 2});
    await Promise.all([
      createRow({file: secondFile}),
      createRow({file: secondFile}),
      createRow({file: secondFile})
    ]);

    // Testing the amount of rows.
    const validFileRowNumber = async ({storageID, expectedNumberOfRows}) => {
      const {data: {fileInfo: {numberOfRows}}} = await sendQuery(fileInfoQuery(storageID), testingServer);
      expect(numberOfRows).toBe(expectedNumberOfRows);
    };

    await validFileRowNumber({storageID: 1, expectedNumberOfRows: 2});
    await validFileRowNumber({storageID: 2, expectedNumberOfRows: 3});
  });

  it('Send query when the file status is failed', async () => {
    await createFile({storageID: 1, error: 'The file does not exists'});
    const {data: {fileInfo: {error}}} = await sendQuery(fileInfoQuery(1), testingServer);
    expect(error).toBe('The file does not exists');
  });

});
