import {createTestingServer} from "./testingUtils";

describe('Testing server: page helper', () => {

  // @ts-ignore
  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  it('Get all page helpers', async () => {});
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
