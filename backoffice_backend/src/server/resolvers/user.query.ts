import {assertLoggedIn} from "../server";
import {getUser} from "../../db/user";

export default {
  users: async (_, __, context) => {
    assertLoggedIn(context);
    return await getUser({conditions: {}})
  },
  user: async (_, args, context) => {
    assertLoggedIn(context);
    return await getUser({id: args.id})
  },
  me: async (_, __, context) => {
    assertLoggedIn(context);

    const {user} = context;
    // Get the user.
    return user;
  },
}
