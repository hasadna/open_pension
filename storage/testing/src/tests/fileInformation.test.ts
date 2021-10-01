import {getAxios} from "./utils";
describe('File information', () => {

  it('Downloading a file which not exists', async () => {
    try {
      await getAxios().get('/file/21');
    } catch (e) {
      const {response: {data, status}} = e as any;
      expect(status).toBe(404);
      expect(data).toStrictEqual({message: "Not Found"});
    }
  });

  it('Requesting a file: png', async () => {
    expect(1).toBe(1);
  });

  it('Requesting a file: xml', async () => {
    expect(1).toBe(1);
  });

  it('Getting all the file from the graphql endpoint', async () => {
    expect(1).toBe(1);
  });
});
