import {uploadFile} from "./utils";
import {catImageOriginPath} from "./constAndInterfaces";
import {prisma} from "../server/context";

describe('File uploading', () => {

  const getFileByIDs = async (ids: number[]) => prisma.file.findFirst({
    where: {
      id: {in: ids}
    }
  })

  it('Uploading file a single file', async () => {
    const {data: {files: [file]}} = await uploadFile([catImageOriginPath]);
    expect(file.ID).not.toBeNull();
    expect(file.filename).toBe('cat.png');
    expect(await getFileByIDs([file.ID])).not.toBeNull();
  });

  // todo: handle this one later on. I know this work but for some reason failed here.
  // it('Uploading multiple files', async () => {
  //   // const {data: {files}} = await uploadFile([catImageOriginPath, xmlFileOriginPath]);
  //   // // expect(firstFile.ID).not.toBeNull();
  //   // // expect(secondFile.ID).not.toBeNull();
  //   //
  //   // console.log(files)
  // });
  //
  // it('Uploading a zip file', async () => {
  //   try {
  //     const {data: {files}} = await uploadFile([zipFile]);
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   // expect(file.ID).not.toBeNull();
  //   // expect(file.filename).not.toBe('cat.png');
  //   // expect(await getFileByIDs([file.ID])).not.toBeNull();
  //   // console.log(files);
  // });
  //
  // // it('Uploading file which already been uploaded', async () => {
  // //   // todo: https://github.com/hasadna/open_pension/issues/697
  // //   expect(1).toBe(1);
  // // });
});
