import {
  createTestingServer,
  sendQuery
} from "./testingUtils";
import {createPage, getPage} from "../../db/page";
import {
  pageCreateQuery,
  pageDeleteQuery,
  pageQuery, pagesQuery,
  pageUpdateQuery
} from "./query.pages";

describe('Testing server:: page', () => {
  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  /**
   * Comparing object from the DB and the representation of the that object from
   * a GraphQL resolver.
   *
   * @param pageFromResponse - The object from the response.
   * @param pageFromDb - The object from the DB.
   */
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
    const {errors, data: {pageCreate}} = await sendQuery(pageCreateQuery({label: "first page"}), testingServer)

    expect(errors).toBeUndefined();
    expect(pageCreate).not.toBeNull();

    const {collections: {_doc: pageFromDB}} = await getPage({id: pageCreate.id});
    comparePageFromResponseToDbObject(pageCreate, pageFromDB);
  });

  it('Server: Updating a page', async () => {
    const {data: {pageCreate}} = await sendQuery(pageCreateQuery({label: "first page"}), testingServer)
    expect(pageCreate).not.toBeNull();

    const {data: {pageUpdate}} = await sendQuery(pageUpdateQuery({id: pageCreate.id, label: "first page - updated"}), testingServer);

    const {collections: {_doc: pageFromDB}} = await getPage({id: pageCreate.id});
    comparePageFromResponseToDbObject(pageUpdate, pageFromDB);
  });

  it('Server: Delete a page', async () => {
    const {object: page} = await createPage({label: 'first page'});
    const id = String(page._id);
    const {data: {pageDelete}} = await sendQuery(pageDeleteQuery({id}), testingServer);
    expect(pageDelete).toBeTruthy();

    const {collections} = await getPage({id});
    expect(collections).toBeNull();
  });
});
