import {assertLoggedIn} from "../server";
import {getPage} from "../../db/page";

export default {
  pages: async (_, __, context) => {
    assertLoggedIn(context);
    const {collections: pages} = await getPage({conditions: {}});

    return pages;
  },
  page: async (_, args, context) => {
    assertLoggedIn(context);
    const {collections: page} = await getPage({id: args.id});
    return page;
  },
}
