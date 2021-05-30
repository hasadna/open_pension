import {
  createTestingServer,
  pageHelpersQuery,
  sendQuery
} from "./testingUtils";
import {createPage} from "../db/page";
import {createPageHelper} from "../db/pageHelper";

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
    const data = await sendQuery(pageHelpersQuery, testingServer);
    console.log(data);
  });

  it('Get a page helper by args', async () => {});
  it('Creating a page helper with valid values', async () => {});

  it('Creating a page helper with invalid values: missing description', async () => {});
  it('Creating a page helper with invalid values: missing element ID', async () => {});
  it('Creating a page helper with invalid values: missing page ID', async () => {});
  it('Creating a page helper with invalid values: passing invalid page ID as reference', async () => {});

  it('Updating a page helper with valid values', async () => {});
  it('Updating a page helper with invalid values: missing description', async () => {});
  it('Updating a page helper with invalid values: passing invalid page ID as reference', async () => {});

  it('Delete a page ID', async () => {});

});
