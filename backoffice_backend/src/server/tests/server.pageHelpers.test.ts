import {
  createTestingServer,
  sendQuery
} from "./testingUtils";
import {createPage} from "../../db/page";
import {createPageHelper, getPageHelper} from "../../db/pageHelper";
import {
  pageHelperCreateQuery,
  pageHelperDeleteQuery, pageHelperQuery, pageHelpersQuery,
  pageHelperUpdateQuery
} from "./query.pageHelper";

describe('Testing server: page helper', () => {

  // @ts-ignore
  let testingServer, firstPageHelper, secondPageHelper, page;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  beforeEach(async () => {
    // Create a dummy page object for reference in other tests.
    const {object} = await createPage({label: 'Dummy label'});
    page = object;

    // Create two page helpers.
    const [firstPageHelperObject,secondPageHelperObject] = [
      {
        page,
        description: 'Dummy description',
        elementID: 'aboveCode',
      },
      {
        page,
        description: 'Dummy label',
        elementID: 'aboveRoutes',
      }
    ];

    const {object: createFirstPageHelper} = await createPageHelper(firstPageHelperObject);
    const {object: createdSecondPageHelper} = await createPageHelper(secondPageHelperObject);

    [firstPageHelper, secondPageHelper] = [createFirstPageHelper, createdSecondPageHelper]
  });

  it('Get all page helpers', async () => {
    const {data: {pageHelpers: {pageHelpers: [firstPageHelper, secondPageHelpers], totalCount}}} = await sendQuery(pageHelpersQuery, testingServer);
    expect(totalCount).toBeGreaterThan(0);

    expect(firstPageHelper.description).toBe('Dummy description');
    expect(firstPageHelper.elementID).toBe('aboveCode');
    expect(firstPageHelper.page.id).toBe(String(page._doc._id));

    expect(secondPageHelpers.description).toBe('Dummy label');
    expect(secondPageHelpers.elementID).toBe('aboveRoutes');
    expect(secondPageHelpers.page.id).toBe(String(page._doc._id));
  });

  it('Get a page helper', async () => {
    const id = String(firstPageHelper._id);
    const {data: {pageHelper}} = await sendQuery(pageHelperQuery(id), testingServer);
    const {id: IDFromResponse, description, elementID, page: pageFromResponse} = pageHelper;

    expect(IDFromResponse).toBe(id);
    expect(description).toBe('Dummy description');
    expect(elementID).toBe('aboveCode');
    expect(pageFromResponse.id).toBe(String(page._doc._id));
  });

  it('Creating a page helper with valid values', async () => {
    const pageID = page._doc._id;
    const {data: {pageHelperCreate: {id, description, elementID, page: pgeFromResponse}, errors}} = await sendQuery(pageHelperCreateQuery({
      page: pageID,
      elementID: "aboveStaff",
      description: "This is the staff picture",
    }), testingServer);

    expect(errors).toBeUndefined();
    const {collections: pageHelperFromDB} = await getPageHelper({id});

    expect(id).toBe(String(pageHelperFromDB._id))
    expect(description).toBe('This is the staff picture');
    expect(elementID).toBe('aboveStaff');
    expect(String(pageID)).toBe(pgeFromResponse.id)
  });

  it('Updating a page helper with valid values', async () => {
    const {object: {_id: secondPageId}} = await createPage({label: 'Second page'});

    const {data: {pageHelperUpdate: {id, description, elementID, page: pageFromResponse}}} = await sendQuery(pageHelperUpdateQuery({
      id: String(firstPageHelper.id),
      page: String(secondPageId),
      description: 'updated description',
      elementID: 'updated element id',
    }), testingServer);

    expect(id).toBe(String(firstPageHelper.id));
    expect(description).toBe('updated description');
    expect(elementID).toBe('updated element id');
    expect(elementID).toBe('updated element id');
    expect(pageFromResponse.id).toBe(String(secondPageId));
    expect(pageFromResponse.label).toBe('Second page');
  });

  it('Delete a page ID', async () => {
    const [firstPageHelperID, secondPageHelperID] = [String(firstPageHelper.id), String(secondPageHelper.id)];
    const {data: {pageHelperDelete: pageHelperDelete}} = await sendQuery(pageHelperDeleteQuery(firstPageHelperID), testingServer);
    expect(pageHelperDelete).toBe(true);

    const {collections: deletedPageHelper} = await getPageHelper({id: firstPageHelperID})
    const {collections: nonDeletePageHelper} = await getPageHelper({id: secondPageHelperID})

    expect(deletedPageHelper).toBeNull();
    expect(nonDeletePageHelper).not.toBeNull();
  });
});
