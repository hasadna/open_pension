import {createToken, getUser, refreshToken, revokeToken} from "../../db/user";
import {UserInputError} from "apollo-server";
import * as bcrypt from 'bcrypt';
import {isEmpty} from 'lodash';
import {log} from "open-pension-logger";

export default  {
  tokenCreate: async (_, args) => {
    const {username, email, password} = args;
    const conditions = {};

    log(`Create a token for the user: ${JSON.stringify(username, email)}`)

    if (username) {
      conditions['username'] = username;
    } else {
      conditions['email'] = email;
    }

    const [user] = await getUser({conditions});

    if (isEmpty(user)) {
      log(`Trying to login with the wrong ${JSON.stringify(args)}`, 'error');
      throw new UserInputError('Wrong username or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      log(`Trying to login with the wrong ${JSON.stringify(args)}`, 'error');
      throw new UserInputError('Wrong username or password');
    }

    const token = await createToken(user);

    // @ts-ignore
    token['expires'] = Math.ceil(token.expires.getTime() / 1000);
    return token;
  },
  refreshToken: async (_, args) => {
    log(`Refreshing a token: ${args.token}`)

    return await refreshToken(args.token, args.refreshToken);
  },
  revokeToken: async (_, args) => {
    // todo: pull it from the context once the middelware will exists.
    const {id} = args;
    const user = await getUser({id});

    log(`Revoking a token for the user: ${user.email}`)

    await revokeToken(user)
    return true;
  },
}
