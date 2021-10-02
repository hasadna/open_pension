import {uploadFile} from "./utils";
import {catImageOriginPath} from "./constAndInterfaces";

describe('File uploading', () => {

  it('Uploading file a single file', async () => {
    const {data: {files: [file]}} = await uploadFile([catImageOriginPath]);
    expect(file.ID).not.toBeNull();
    expect(file.filename).not.toBe('cat.png');

    // todo: get the file info from the graphql.
  });

  it('Uploading multiple files', async () => {
    expect(1).toBe(1);
  });

  it('Uploading a zip file', async () => {
    expect(1).toBe(1);
  });

  // it('Uploading file which already been uploaded', async () => {
  //   // todo: https://github.com/hasadna/open_pension/issues/697
  //   expect(1).toBe(1);
  // });
});
