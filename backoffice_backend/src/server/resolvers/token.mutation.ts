import {createToken, getUser, refreshToken, revokeToken} from "../../db/user";
import {UserInputError} from "apollo-server";
import * as bcrypt from 'bcrypt';
import {isEmpty} from 'lodash';

export default  {
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
}
