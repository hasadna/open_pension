import {assertLoggedIn} from "../server";
import {createPage, deletePage, updatePage} from "../../db/page";
import {UserInputError} from "apollo-server";
import {log} from "open-pension-logger";

export default {
  pageCreate: async (_, args, context) => {
    assertLoggedIn(context);
    log({text: `Creating a page: ${JSON.stringify(args)}`})

    const {label} = args;
    const {object: page, errors} = await createPage({label});

    if (errors) {
      log({text: `There was an error while creating the user: ${JSON.stringify(errors)}`}, 'error');
      throw new UserInputError('There was an error while creating the user', errors)
    }

    return page;
  },
  pageUpdate: async(_, args, context) => {
    assertLoggedIn(context);
    log({text: `Updating a page: ${JSON.stringify(args)}`})

    const {label, id} = args;
    return await updatePage(id, {label});
  },
  pageDelete: async(_, args, context) => {
    assertLoggedIn(context);
    log({text: `Deleting a page: ${JSON.stringify(args)}`})

    const {id} = args;
    await deletePage(id);

    return true;
  },
}
