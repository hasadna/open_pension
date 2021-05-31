import {assertLoggedIn} from "../server";
import {updateFile} from "../../db/file";

export default {
  fileUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    const id = args.id;
    return await updateFile(id, args);
  }
}
