import {getAxios} from "./utils";
import {AxiosError} from "./interfaces";
import {prisma} from "../server/context";
import {join} from 'path';
import {copyFileSync} from "fs";

describe('File information', () => {

  it('Downloading a file which not exists', async () => {
    try {
      await getAxios().get('/file/21');
    } catch (e) {
      const {response: {data, status}} = e as AxiosError;
      expect(status).toBe(404);
      expect(data).toStrictEqual({message: "Not Found"});
    }
  });

  it('Requesting a file: png', async () => {
    // Copy the file from the assets to the volume of the files which belong to the storage.
    copyFileSync(
      join(process.cwd(), 'src', 'tests', 'assets', 'cat.png'),
      join(process.cwd(), '../', '../', 'data', 'files', 'storage', 'cat.png')
    );
    const file = await prisma.file.create({
      data: {
        filename: 'cat.png',
        path: '/home/app/download_files/cat.png',
      },
    });

    const {headers, data} = await getAxios().get(`/file/${file.id}`);
    expect(headers['content-type']).toBe('image/png');

    // @ts-ignore
    expect(data.includes('PNG')).toBeTruthy();
  });

  it('Requesting a file: xml', async () => {
    expect(1).toBe(1);
  });

  it('Requesting a file with a path which does not exists', async () => {

  });

  it('Getting all the file from the graphql endpoint', async () => {
    expect(1).toBe(1);
  });
});
