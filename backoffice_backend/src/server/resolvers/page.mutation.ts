import {assertLoggedIn} from "../server";
import {createPage, deletePage, updatePage} from "../../db/page";
import {UserInputError} from "apollo-server";

export default {
  pageCreate: async (_, args, context) => {
    assertLoggedIn(context);
    const {label} = args;
    const {object: page, errors} = await createPage({label});

    if (errors) {
      throw new UserInputError('There was an error while creating the user', errors)
    }

    return page;
  },
  pageUpdate: async(_, args, context) => {
    assertLoggedIn(context);

    const {label, id} = args;
    return await updatePage(id, {label});
  },
  pageDelete: async(_, args, context) => {
    assertLoggedIn(context);

    const {id} = args;
    await deletePage(id);

    return true;
  },
}
