import {getAxios} from "./utils";
import {AxiosError} from "./interfaces";
import {prisma} from "../server/context";
import {join} from 'path';
import {copyFileSync} from "fs";
import {parseStringPromise} from "xml2js";

describe('File information', () => {
  const catImageOriginPath = join(process.cwd(), 'src', 'tests', 'assets', 'cat.png');
  const catImageDestinationPath = join(process.cwd(), '../', '../', 'data', 'files', 'storage', 'cat.png');

  const xmlFileOriginPath = join(process.cwd(), 'src', 'tests', 'assets', 'animals.xml');
  const xmlFileDestinationPath = join(process.cwd(), '../', '../', 'data', 'files', 'storage', 'animals.xml');

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
    copyFileSync(catImageOriginPath, catImageDestinationPath);

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
    copyFileSync(xmlFileOriginPath, xmlFileDestinationPath);
    const file = await prisma.file.create({
      data: {
        filename: 'cat.png',
        path: '/home/app/download_files/animals.xml',
      },
    });

    const {headers, data} = await getAxios().get(`/file/${file.id}`);
    const {animals: {description, animal: [firstAnimal, secondAnimal]}} = await parseStringPromise(data);

    expect(headers['content-type']).toBe('application/xml');
    expect(description).toStrictEqual([ 'This is the list of animals' ]);
    expect(firstAnimal).toStrictEqual({ type: [ 'Cat' ], name: [ 'Sam' ] });
    expect(secondAnimal).toStrictEqual({ type: [ 'Cat' ], name: [ 'Tom' ] });
  });

  it('Requesting a file with a path which does not exists', async () => {

  });

  it('Getting all the file from the graphql endpoint', async () => {
    expect(1).toBe(1);
  });
});
