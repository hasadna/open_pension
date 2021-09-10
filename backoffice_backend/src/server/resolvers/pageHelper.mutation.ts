import {assertLoggedIn} from "../server";
import {getPage} from "../../db/page";
import {
  createPageHelper,
  deletePageHelper,
  updatePageHelper
} from "../../db/pageHelper";
import {UserInputError} from "apollo-server";
import {log} from "open-pension-logger";

export default {
  pageHelperCreate: async(_, args, context) => {
    assertLoggedIn(context);
    const {description, page, elementID} = args;
    log(`Creating a page helper: ${JSON.stringify(args)}`)

    // todo: handle non-existing page.
    const {collections: pageFromDB} = await getPage({id: page});
    const {object: pageHelper, errors} = await createPageHelper({
      page: pageFromDB, description, elementID
    })

    if (errors) {
      log(`There was an error while creating the page helper: ${JSON.stringify(errors)}`, 'error');
      throw new UserInputError('There was an error while creating the page helper', errors)
    }

    return pageHelper;
  },
  pageHelperUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    log(`Update a page helper: ${JSON.stringify(args)}`)

    const {description, page, elementID, id} = args;
    const {collections: pageFromDB} = await getPage({id: page});

    // todo: handle non-existing page.
    const data = await updatePageHelper(id, {
      description,
      page: pageFromDB,
      elementID
    });
    data.page = pageFromDB;
    return data;
  },
  pageHelperDelete: async (_, args, context) => {
    assertLoggedIn(context);
    log(`Delete a page helper: ${JSON.stringify(args)}`)

    const {id} = args;
    await deletePageHelper(id);
    return true;
  },
}
