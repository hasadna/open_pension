import {assertLoggedIn} from "../server";
import {getPage} from "../../db/page";
import {log} from "open-pension-logger";

export default {
  pages: async (_, args, context) => {
    assertLoggedIn(context);
    log({text: `Getting all the pages: ${JSON.stringify(args)}`})
    const {collections: pages} = await getPage({conditions: {}});

    return pages;
  },
  page: async (_, args, context) => {
    assertLoggedIn(context);
    log({text: `Getting a page: ${JSON.stringify(args)}`})

    const {collections: page} = await getPage({id: args.id});
    return page;
  },
}
