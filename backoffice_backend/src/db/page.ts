import {
  BaseEntity, createObject, deleteObject,
  Filter,
  GetEntityArguments,
  getObject,
  Pagination, TransactionResults, updateObject
} from "./Utils";
import mongoose from "./db";

export type PageInterface = BaseEntity& {
  readonly label: string;
}

export const pageSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const Page = mongoose.model('pages', pageSchema);

/**
 * Loading a page from the DB by id or condition.
 *
 * @param {string} id - The id of the page.
 * @param {Conditions} conditions - The conditions to filter the pages by.
 * @param {Pagination} pagination - pagination for the items.
 * @param {Filter} filter - The filter params passed from GraphQL.
 * @param {boolean} withTotalCount - Determine if we need to return just the
 *  items or including the count. Should be removed once all the models line up
 *  with the new format.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getPage({id, conditions}: GetEntityArguments, pagination: Pagination = {}, filter: Filter[] = []) {
  const {collections, totalCount} = await getObject(Page, {id, conditions}, pagination, filter);
  return {collections, totalCount};
}

/**
 * Creating a page.
 *
 * @param page - The page object.
 */
export async function createPage(page: PageInterface): Promise<TransactionResults> {
  return await createObject(Page, page);
}

/**
 * Updating a page.
 *
 * @param id - The ID of the page.
 * @param newValues - The new values of the page.
 */
export async function updatePage(id, newValues) {
  return await updateObject(Page, id, newValues);
}

/**
 * Delete a page from the DB.
 *
 * @param id - The id of the page.
 */
export async function deletePage(id) {
  await deleteObject(Page, id);
}
