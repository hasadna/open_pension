import {assertLoggedIn} from "../server";
import {getFile} from "../../db/file";

export default {
  files: async (_, {filter, pagination = {}}, context) => {
    assertLoggedIn(context);

    const {collections: files, totalCount} = await getFile({conditions: {}}, pagination, filter)
    return {files, totalCount}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    const {collections: file} = await getFile({id: args.id});

    return file;
  },
}
