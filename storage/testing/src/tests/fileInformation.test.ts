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

  const createMultipleFiles = async () => {
    const filesData = [
      {filename: 'cat.png', path: '/home/app/download_files/cat.png'},
      {filename: 'dog.png', path: '/home/app/download_files/dog.png'},
      {filename: 'pizza.png', path: '/home/app/download_files/pizza.png'},
      {filename: 'calzone.png', path: '/home/app/download_files/calzone.png'},
    ];

    return Promise.all(filesData.map(data => prisma.file.create({data})));
  }

  it('Downloading a file which not exists', async () => {
    try {
      await getAxios().get('/file/21');
      new Error('The test needed to fail but it succeeded');
    } catch (e) {
      const {response: {data, status}} = e as AxiosError;
      expect(status).toBe(404);
      expect(data).toStrictEqual({message: "Not Found"});
    }
  });

  it('Requesting a file with a path which does not exists', async () => {
    const file = await prisma.file.create({
      data: {
        filename: `${new Date().getTime()}.png`,
        path: `/home/app/download_files/${new Date().getTime()}.png`,
      },
    });

    try {
      await getAxios().get(`/file/${file.id}`);
      new Error('The test needed to fail but it succeeded');
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

  it('Getting all the files from the graphql endpoint', async () => {
    const files = await createMultipleFiles();

    const {data: {data: {files: filesFromResponse}}} = await getAxios().post(`/graphql`, {
      query: `
        query {
          files {
            id
            filename
            path
          }
        }
      `
    }) as any;

    // @ts-ignore
    files.forEach(({id, filename, path}) => {
      const item = filesFromResponse.find((filesFromResponse: any) => parseInt(filesFromResponse.id) === id);
      expect(item.filename).toBe(filename);
      expect(item.path).toBe(path);
    });
  });

  // it('Getting a single file the graphql endpoint', async () => {
  // });
});
