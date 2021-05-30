import {
  createTestingServer, pageHelperCreateQuery, pageHelperQuery,
  pageHelpersQuery,
  sendQuery
} from "./testingUtils";
import {createPage} from "../db/page";
//@ts-ignore
import {createPageHelper, getPageHelper} from "../db/pageHelper";

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

  /**
   * Sending a request to create a page helper.
   *
   * @param page - The page ID.
   * @param elementID - The element ID.
   * @param description - The description.§
   */
  const sendCreateQuery = async ({page = null, elementID = null, description = null}) => {
    return await sendQuery(pageHelperCreateQuery({page, elementID, description}), testingServer);
  }

  it('Get all page helpers', async () => {
    const {data: {pageHelpers: {pageHelpers: [firstPageHelper, secondPageHelpers], totalCount}}} = await sendQuery(pageHelpersQuery, testingServer);
    expect(totalCount).toBe(2);

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
    const {data: {pageHelperCreate: {id, description, elementID, page: pgeFromResponse}, errors}} = await sendCreateQuery({
      page: pageID,
      elementID: "aboveStaff",
      description: "This is the staff picture",
    })

    expect(errors).toBeUndefined();
    const {collections: pageHelperFromDB} = await getPageHelper({id});

    expect(id).toBe(String(pageHelperFromDB._id))
    expect(description).toBe('This is the staff picture');
    expect(elementID).toBe('aboveStaff');
    expect(String(pageID)).toBe(pgeFromResponse.id)
  });

  it('Updating a page helper with valid values', async () => {});
  it('Delete a page ID', async () => {});

});
