import mongoose from "./db";
import {
  BaseEntity, createObject, deleteObject,
  Filter,
  GetEntityArguments,
  getObject,
  Pagination, TransactionResults, updateObject
} from "./Utils";
// @ts-ignore
import {getPage, PageInterface} from "./page";
// @ts-ignore
import {isEmpty} from 'lodash';

export type PageHelperInterface = BaseEntity& {
  readonly description: string;
  readonly elementID: string;
  readonly page: PageInterface;
}

const pageHelperSchema = new mongoose.Schema({
  description: { type: String, required: true },
  elementID: { type: String, required: true },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pages',
    validate: {
      validator: async function({id}) {

        if (isEmpty(id)) {
          return false;
        }

        try {
          id = String(id);

          const {collections} = await getPage({id});
          return !isEmpty(collections);
        } catch (e) {
          return false;
        }


      },
      message: 'The given ID is not a valid page object',
    },
    required: true,
  }
});

export const PageHelper = mongoose.model('pageHelpers', pageHelperSchema);

/**
 * Get a page helper form the DB.
 *
 * @param {string} id - The id of the page helper.
 * @param {Conditions} conditions - The conditions to filter the page helpers by.
 * @param {Pagination} pagination - pagination for the items.
 * @param {Filter} filter - The filter params passed from GraphQL.
 * @param {boolean} withTotalCount - Determine if we need to return just the
 *  items or including the count. Should be removed once all the models line up
 *  with the new format.
 */
export async function getPageHelper({id, conditions}: GetEntityArguments, pagination: Pagination = {}, filter: Filter[] = []) {
  const {collections, totalCount} = await getObject(PageHelper, {id, conditions}, pagination, filter);
  return {collections, totalCount};
}

/**
 * Create a page helper.
 *
 * @param pageHelper - The page helper object.
 */
export async function createPageHelper(pageHelper: PageHelperInterface): Promise<TransactionResults> {
  return await createObject(PageHelper, pageHelper);
}

/**
 * Updating a page helper.
 *
 * @param id - The ID of the page helper.
 * @param newValues - The new values of the page helper.
 */
export async function updatePageHelper(id, newValues) {
  return await updateObject(PageHelper, id, newValues);
}

/**
 * Delete a page helper from the DB.
 *
 * @param id - The id of the page.
 */
export async function deletePageHelper(id) {
  await deleteObject(PageHelper, id);
}
