import {
  createPage,
  deletePage,
  getPage,
  PageInterface,
  updatePage
} from "./page";

describe('Page', () => {

  const dummyPage: PageInterface = {label: 'first page'};

  it('Creating a page with unique label', async() => {
    const {errors, object} = await createPage(dummyPage);
    expect(errors).toBeNull();
    expect(object.label).toBe('first page');
  });

  it('Should failed when not passing a label', async() => {
    await createPage(dummyPage);

    // @ts-ignore
    const {errors, object} = await createPage({food: 'pizza'});

    expect(object).toBeNull();
    expect(errors).toStrictEqual({ label: 'Path `label` is required.' })
  });

  it('Testing an update of a page', async() => {
    const {object: {_id: id}} = await createPage(dummyPage);
    const {label} = await updatePage(id, {label: 'second page'});
    expect(label).toBe('second page');

    // Reloading the page from the DB.
    const {collections: {_id: reloadedId, label: reloadedLabel}} = await getPage({id});

    expect(String(reloadedId)).toBe(String(id));
    expect(reloadedLabel).toBe('second page');
  });

  it('Deleting a page', async() => {
    const {object: {_id: id}} = await createPage(dummyPage);
    const {collections} = await getPage({id});
    expect(collections).not.toBeNull();

    // Deleting the page and verify we cannot load it again.
    await deletePage(id);
    const {collections: collectionAfterDelete} = await getPage({id});
    expect(collectionAfterDelete).toBeNull();
  });
});
