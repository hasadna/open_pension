import {assertLoggedIn} from "../server";
import {createUser, deleteUser, updateUser} from "../../db/user";
import {UserInputError} from "apollo-server";

export default {
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
}
