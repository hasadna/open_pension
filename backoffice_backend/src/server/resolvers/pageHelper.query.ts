import {assertLoggedIn} from "../server";
import {getPageHelper} from "../../db/pageHelper";
import {isEmpty} from 'lodash';

export default {
  pageHelpers: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);

    if (!isEmpty(filter)) {
      const key = filter.findIndex(item => item.key === 'page');

      if (key >= 0) {
        filter[key].key = 'page._id';
      }
    }

    const {collections: pageHelpers, totalCount} = await getPageHelper({conditions: {}}, pagination, filter)
    return {pageHelpers, totalCount}
  },

  pageHelper: async (_, {id}, context) => {
    assertLoggedIn(context);

    const {collections: pageHelper} = await getPageHelper({id})
    return pageHelper
  },
}
