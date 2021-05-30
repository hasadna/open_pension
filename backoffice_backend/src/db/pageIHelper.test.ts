import {createPage, PageInterface} from "./page";
import {createPageHelper} from "./pageHelper";
import {createUser} from "./user";
import {validUser} from "./user.test";

describe('Page helper', () => {

  let basePage: PageInterface;

  beforeEach(async() => {
    // Create a dummy page object for reference in other tests.
    const {object} = await createPage({label: 'Dummy label'});
    basePage = object;
  });

  /**
   * Creating an invalid page handle and verify an expected error has been
   * raised.
   *
   * @param createPagePayload - The payload.
   * @param expected - The expected error.
   */
  const createInvalidObjectAndExpectErrors = async (createPagePayload, expected) => {
    const {errors} = await createPageHelper(createPagePayload);
    expect(errors).toStrictEqual(expected);
  };

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

  it('Create a page helper with wrong values: invalid page reference', async () => {
    // Creating a dummy user object for reference.
    const {object: user} = await createUser(validUser);
    let {errors: errorFromUser} = await createPageHelper({
      page: user,
      description: 'Dummy description',
      elementID: 'aboveCode',
    });
    expect(errorFromUser).toStrictEqual({ page: 'Path `page` is required.' });
  });

  it('Create a page helper with wrong values: empty page', async () => {
    await createInvalidObjectAndExpectErrors(
      {page: null, description: 'description', elementID: 'aboveCode',},
      { page: 'Path `page` is required.' }
    )
  });

  it('Create a page helper with wrong values: empty description', async () => {
    await createInvalidObjectAndExpectErrors(
      {page: basePage, description: null, elementID: 'aboveCode',},
      { description: 'Path `description` is required.' }
    )
  });

  it('Create a page helper with wrong values: empty elementID', async () => {
    await createInvalidObjectAndExpectErrors(
      {page: basePage, description: 'description', elementID: null,},
      { elementID: 'Path `elementID` is required.' }
    )
  });

  it('Create a page helper with wrong values: empty object', async () => {
    await createInvalidObjectAndExpectErrors(
      {page: null, description: null, elementID: null,},
      {
        description: "Path `description` is required.",
        elementID: "Path `elementID` is required.",
        page: "Path `page` is required.",
      }
    )
  });

  it('Load all page helpers', async () => {});

  it('Load a page helper', async () => {});

  it('Update a page helper', async () => {});

  it('Delete a pager helper', async () => {});
});
