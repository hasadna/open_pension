import {assertLoggedIn} from "../server";
import {getPageHelper} from "../../db/pageHelper";

export default {
  pageHelpers: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);

    const {collections: pageHelpers, totalCount} = await getPageHelper({conditions: {}}, pagination, filter)
    return {pageHelpers, totalCount}
  },

  pageHelper: async (_, {id}, context) => {
    assertLoggedIn(context);

    const {collections: pageHelper} = await getPageHelper({id})
    return pageHelper
  },
}
