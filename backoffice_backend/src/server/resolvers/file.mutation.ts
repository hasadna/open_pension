import {assertLoggedIn} from "../server";
import {updateFile} from "../../db/file";
import {log} from "open-pension-logger";

export default {
  fileUpdate: async (_, args, context) => {
    assertLoggedIn(context);
    const id = args.id;
    log(`Updating the file: ${JSON.stringify(args)}`)
    return await updateFile(id, args);
  }
}
