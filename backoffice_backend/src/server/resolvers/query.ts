import { getFile } from '../../db/file';
import { getUser } from '../../db/user';
import { assertLoggedIn } from '../server';
import {Pagination} from "../../db/utils";

export default {
  files: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);
    const {itemsNumber, page}: Pagination = pagination;
    const {collections: files, totalItems} = await getFile({conditions: {}}, {itemsNumber, page}, filter)

    return {files, totalItems}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    return await getFile({id: args.id})
  },

  users: async (_, __, context) => {
    assertLoggedIn(context);
    return await getUser({conditions: {}})
  },
  user: async (_, args, context) => {
    assertLoggedIn(context);
    return await getUser({id: args.id})
  },

  // @ts-ignore
  me: async (_, args, context) => {
    assertLoggedIn(context);

    const {user} = context;
    // Get the user.
    return user;
  }
};
