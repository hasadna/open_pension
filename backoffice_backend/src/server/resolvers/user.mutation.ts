import {assertLoggedIn} from "../server";
import {createUser, deleteUser, updateUser} from "../../db/user";
import {UserInputError} from "apollo-server";
import {log} from "open-pension-logger";

export default {
  userCreate: async (_, args, context) => {
    assertLoggedIn(context);
    const {object: user, errors} = await createUser(args);

    if (errors) {
      log(`Error while trying to create the user: ${JSON.stringify(args)}`, 'error');
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
    } catch (error) {
      log(`There was an error while trying to delete the user: ${JSON.stringify(error)}`, 'error')
      return false;
    }
  },
}
