import {UserInputError} from 'apollo-server';
import * as bcrypt from 'bcrypt';
import {isEmpty} from 'lodash';
import { updateFile} from '../../db/file';
import {
  createToken,
  createUser,
  deleteUser,
  getUser,
  refreshToken,
  revokeToken,
  updateUser
} from '../../db/user';
import {assertLoggedIn} from '../server';
import {createPage, deletePage, getPage, updatePage} from "../../db/page";
import {
  createPageHelper, deletePageHelper,
  updatePageHelper
} from "../../db/pageHelper";

export default {
  fileUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    const id = args.id;
    return await updateFile(id, args);
  },
  // User.
  userCreate: async (_, args, context) => {
    assertLoggedIn(context);
    const {object: user, errors} = await createUser(args);

    if (errors) {
      throw new UserInputError('There was an error while creating the user', errors)
    }

    return user
  },
  userUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    const id = args.id;
    return await updateUser({id, newValues: args});
  },
  userDelete: async (_, args, context) => {
    assertLoggedIn(context);
    const id = args.id;
    try {
      await deleteUser(id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  //  Auth.
  tokenCreate: async (_, args) => {
    const {username, email, password} = args;
    const conditions = {};

    if (username) {
      conditions['username'] = username;
    } else {
      conditions['email'] = email;
    }

    const [user] = await getUser({conditions});

    if (isEmpty(user)) {
      throw new UserInputError('Wrong username or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UserInputError('Wrong username or password')
    }

    const token = await createToken(user);

    // @ts-ignore
    token['expires'] = Math.ceil(token.expires.getTime() / 1000);

    return token;
  },
  refreshToken: async (_, args) => {
    return await refreshToken(args.token, args.refreshToken);
  },
  revokeToken: async (_, args) => {
    // todo: pull it from the context once the middelware will exists.
    const {id} = args;
    const user = await getUser({id});
    await revokeToken(user)
    return true;
  },
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

  pageHelperCreate: async(_, args, context) => {
    assertLoggedIn(context);
    const {description, page, elementID} = args;

    // todo: handle non-existing page.

    const {collections: pageFromDB} = await getPage({id: page});
    const {object: pageHelper, errors} = await createPageHelper({
      page: pageFromDB, description, elementID
    })

    if (errors) {
      throw new UserInputError('There was an error while creating the page helper', errors)
    }

    return pageHelper;
  },
  pageHelperUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    // @ts-ignore
    const {description, page, elementID, id} = args;
    const {collections: pageFromDB} = await getPage({id: page});

    // todo: handle non-existing page.
    const data = await updatePageHelper(id, {
      description,
      page: pageFromDB,
      elementID
    });
    data.page = pageFromDB;
    return data;
  },
  pageHelperDelete: async (_, args, context) => {
    assertLoggedIn(context);
    // @ts-ignore
    const {id} = args;
    await deletePageHelper(id);
    return true;
  },
}
