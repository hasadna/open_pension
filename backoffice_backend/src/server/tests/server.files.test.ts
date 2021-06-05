import { createFile, getFile, Status } from '../../db/file';

import {
  createTestingServer, sendQuery
} from './testingUtils';
import {fileQuery, queryFiles, fileUpdateQuery} from "./query.files";

describe('Testing server: file', () => {

  let testingServer;

  const validFile = {
    filename: 'foo.png',
    storageId: 42,
    status: Status.stored
  };

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  const compareFileFromResponse = (fileFromDB, fileFromResponse) => {
    expect(String(fileFromDB._id)).toBe(fileFromResponse.id);
    expect(fileFromDB.filename).toBe(fileFromResponse.filename);
    expect(fileFromDB.storageId).toBe(fileFromResponse.storageId);
    expect(String(fileFromDB.createdAt.getTime())).toBe(fileFromResponse.createdAt);
    expect(String(fileFromDB.updatedAt.getTime())).toBe(fileFromResponse.updatedAt);
  }

  it('Testing the files resolvers', async () => {
    const {data: {files: files}} = await sendQuery(queryFiles, testingServer);
    expect(files.files).toStrictEqual([]);

    // Adding a dummy file and send request.
    const {object: file} = await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});
    const {data: {files: filesResponse}} = await sendQuery(queryFiles, testingServer);
    const [fileFromResponse] = filesResponse.files;
    compareFileFromResponse(file, fileFromResponse);
  });

  it('Loading a resolver for a single file', async () => {

    const {data: emptyFilesResponse} = await sendQuery(
      fileQuery("1"),
      testingServer
    );

    expect(emptyFilesResponse.file).toBeNull();

    const {object: file} = await createFile(validFile);
    const {data} = await sendQuery(fileQuery(String(file._id)), testingServer);
    compareFileFromResponse(file, data.file);
  });

  it('Testing mutation of a file: updating', async () => {
    const {object: file} = await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});
    expect(file.filename).toBe('foo.png');

    const {data: updatedFile} = await sendQuery(fileUpdateQuery({
      id: String(file._id),
      filename: 'cat.png',
      storageId: 55,
      status: Status.processed
    }), testingServer);

    const {filename, id, status, storageId} = updatedFile.fileUpdate;

    expect(filename).toBe('cat.png');
    expect(status).toBe(Status.processed);
    expect(storageId).toBe(55);

    const {collections: {_doc: loadingFileFromDB}} = await getFile({id: id});

    expect(loadingFileFromDB).not.toBeNull();
    expect(loadingFileFromDB).not.toBeUndefined();
    expect(loadingFileFromDB.filename).toBe('cat.png');
  });
});
