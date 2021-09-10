import {assertLoggedIn} from "../server";
import {getUser} from "../../db/user";
import {log} from "open-pension-logger";

export default {
  users: async (_, args, context) => {
    log(`Get all the users: ${JSON.stringify(args)}`)
    assertLoggedIn(context);
    return await getUser({conditions: {}})
  },
  user: async (_, args, context) => {
    assertLoggedIn(context);
    log(`Get a user: ${JSON.stringify(args)}`)
    return await getUser({id: args.id})
  },
  me: async (_, __, context) => {
    assertLoggedIn(context);

    const {user} = context;
    delete user['password'];
    log(`Get the user object for the logged in user: ${JSON.stringify(user)}`);
    // Get the user.
    return user;
  },
}
