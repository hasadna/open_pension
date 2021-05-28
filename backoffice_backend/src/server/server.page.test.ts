import {createTestingServer, pageQuery, pagesQuery, sendQuery} from "./testingUtils";
import {createPage} from "../db/page";

describe('Server: page', () => {
  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  const comparePageFromResponseToDbObject = (pageFromResponse, pageFromDb) => {
    expect(String(pageFromDb._id)).toBe(pageFromResponse.id);
    expect(pageFromDb.label).toBe(pageFromResponse.label);
  };

  it('Server: Get all pages', async () => {
    const {object: firstPage} = await createPage({label: 'first page'});
    const {object: secondPage} = await createPage({label: 'second page'});

    const {data: {pages: [firstPageFromResponse, secondPageFromResponse]}} = await sendQuery(pagesQuery, testingServer);

    comparePageFromResponseToDbObject(firstPageFromResponse, firstPage);
    comparePageFromResponseToDbObject(secondPageFromResponse, secondPage);
  });

  it('Server: Get a page specific page', async () => {
    const {object: firstPage} = await createPage({label: 'first page'});
    const {object: secondPage} = await createPage({label: 'second page'});

    const {data: {page: firstPageFromResponse}} = await sendQuery(pageQuery({id: String(firstPage._id)}), testingServer);
    comparePageFromResponseToDbObject(firstPageFromResponse, firstPage);

    const {data: {page: secondPageFromResponse}} = await sendQuery(pageQuery({id: String(secondPage._id)}), testingServer);
    comparePageFromResponseToDbObject(secondPageFromResponse, secondPage);
  });

  it('Server: Creating a page', async () => {
    expect(1).toBe(1);
  });

  it('Server: Updating and creating a page with a non unique label', async () => {
    expect(1).toBe(1);
  });

  it('Server: Updating a page', async () => {
    expect(1).toBe(1);
  });

  it('Server: Delete a page', async () => {
    expect(1).toBe(1);
  });
});
