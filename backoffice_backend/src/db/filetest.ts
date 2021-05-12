import {
  createFile,
  FileInterface,
  getFile,
  Status,
  updateFileStatus
} from './file';

describe.skip('File testing', () => {

  it('Should failed when passing invalid values', async () => {
    const baseFile: FileInterface = {
      filename: '',
      status: Status.processedWithError,
    };

    const {errors, object} = await createFile(baseFile);
    expect(object).toBeNull();
    expect(errors).toStrictEqual({ filename: 'Path `filename` is required.' });
  });

  it('Should save a file with valid values: nullable storage ID and valid status', async () => {
    const {errors, object} = await createFile({filename: 'cat.png', status: Status.processed});
    expect(errors).toBeNull();
    expect(object.filename).toBe('cat.png');
    expect(object.status).toBe(Status.processed);
  });

  it('Updating a file status based on the storage ID', async () => {
    const {errors, object} = await createFile({filename: 'cat.png', status: Status.stored, storageId: 42});
    expect(errors).toBeNull();
    expect(object.storageId).toBe(42);

    await updateFileStatus(42, Status.processedWithError);

    const {collections: updatedFile} = await getFile({conditions: {'storageId': 42}});

    expect(updatedFile.status).toBe(Status.processedWithError);
  });

  it('Should failed when creating file with the same storage ID', async () => {
    const baseFile: FileInterface = {
      filename: 'cat.png',
      status: Status.sent,
      storageId: 42
    };

    const {errors} = await createFile(baseFile);
    expect(errors).toBeNull();

    const {errors: secondErrors} = await createFile(baseFile);
    expect(secondErrors.includes('duplicate key error')).toBeTruthy();
  });
});
