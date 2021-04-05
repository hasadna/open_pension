import { UserInputError } from 'apollo-server';
import * as bcrypt from 'bcrypt';
import {isEmpty} from 'lodash';

import { createFile, updateFile } from '../../db/file';
import {
  createToken,
  createUser,
  getUser,
  refreshToken, revokeToken,
  updateUser
} from '../../db/user';
import { assertLoggedIn } from '../server';

export default {
  // File.
  fileCreate: async (_, args, context) => {
    assertLoggedIn(context);

    const {object: file, errors} = await createFile(args);

    if (errors) {
      throw new UserInputError(errors)
    }
    return file
  },
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

  // Auth.
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
    const user = await  getUser({id});
    await revokeToken(user)
    return true;
  }
}
