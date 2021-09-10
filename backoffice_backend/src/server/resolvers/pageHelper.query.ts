import {assertLoggedIn} from "../server";
import {getPageHelper} from "../../db/pageHelper";
import {log} from "open-pension-logger";

export default {
  pageHelpers: async (_, args, context) => {
    assertLoggedIn(context);
    const {filter, pagination = {}} = args;

    log(`Get all the page helpers: ${JSON.stringify(args)}`)

    const {collections: pageHelpers, totalCount} = await getPageHelper({conditions: {}}, pagination, filter)
    return {pageHelpers, totalCount}
  },

  pageHelper: async (_, args, context) => {
    assertLoggedIn(context);
    const {id} = args;
    log(`Get a page helper: ${JSON.stringify(args)}`)

    const {collections: pageHelper} = await getPageHelper({id})
    return pageHelper
  },
}
