import {assertLoggedIn} from "../server";
import {getFile} from "../../db/file";
import {log} from "open-pension-logger";

export default {
  files: async (_, args, context) => {
    assertLoggedIn(context);
    const {filter, pagination = {}} = args;

    log(`Getting all the files: ${JSON.stringify(args)}`)
    const {collections: files, totalCount} = await getFile({conditions: {}}, pagination, filter)
    return {files, totalCount}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    log(`Getting a single file: ${JSON.stringify(args)}`)

    const {collections: file} = await getFile({id: args.id});
    return file;
  },
}
