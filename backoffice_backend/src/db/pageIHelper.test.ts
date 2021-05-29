import {createPage, PageInterface} from "./page";
import {createPageHelper} from "./pageHelper";

describe('Page helper', () => {

  let basePage: PageInterface;

  beforeEach(async() => {
    // Create a dummy page object for reference in other tests.
    const {object} = await createPage({label: 'Dummy label'});
    basePage = object;
  });

  it('Create a page helper with correct values', async () => {
    const {object: {page: {_id, label}, description, elementID}, errors} = await createPageHelper({
      page: basePage,
      description: 'Dummy description',
      elementID: 'aboveCode',
    });

    expect(errors).toBeNull();
    expect(String(_id)).toBe(String(basePage._id));
    expect(label).toBe('Dummy label');
    expect(description).toBe('Dummy description');
    expect(elementID).toBe('aboveCode');
  });

  it('Create a page helper with wrong values', async () => {});

  it('Load all page helpers', async () => {});

  it('Load a page helper', async () => {});

  it('Update a page helper', async () => {});

  it('Delete a pager helper', async () => {});
});
