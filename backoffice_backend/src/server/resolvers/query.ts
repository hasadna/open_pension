import { getFile } from '../../db/file';
import { getUser } from '../../db/user';
import { assertLoggedIn } from '../server';
export default {
  files: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);

    const {collections: files, totalCount} = await getFile({conditions: {}}, pagination, filter)
    return {files, totalCount}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    const {collections: {_doc: file}} = await getFile({id: args.id});

    return file;
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
