import { getFile } from '../../db/file';
import { getUser } from '../../db/user';
import {getPage} from "../../db/page";
import { assertLoggedIn } from '../server';

export default {
  files: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);

    const {collections: files, totalCount} = await getFile({conditions: {}}, pagination, filter)
    return {files, totalCount}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    const {collections: file} = await getFile({id: args.id});

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

  // @ts-ignore
  me: async (_, args, context) => {
    assertLoggedIn(context);

    const {user} = context;
    // Get the user.
    return user;
  }
};
