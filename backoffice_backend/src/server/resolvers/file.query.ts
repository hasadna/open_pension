import {assertLoggedIn} from "../server";
import {getFile, getFileMetadata, updateFile} from "../../db/file";
import {log} from "open-pension-logger";
import {isEmpty} from "lodash";

export default {
  files: async (_, args, context) => {
    assertLoggedIn(context);
    const {filter, pagination = {}} = args;

    log({text: `Getting all the files: ${JSON.stringify(args)}`})
    const {collections: files, totalCount} = await getFile({conditions: {}}, pagination, filter)
    return {files, totalCount}
  },
  file: async (_, args, context) => {
    assertLoggedIn(context);
    log({text: `Getting a single file: ${JSON.stringify(args)}`});
    const {id} = args;
    const {collections: file} = await getFile({id});

    try {

      if (isEmpty(file.extra)) {
        log({text: `Getting the metadata for file ${id}`})
        file.extra = await getFileMetadata(file.storageId);
        await updateFile(id, {extra: file.extra});
      } else {
        log({text: `Not getting the metadata for file ${args.id} since the data already exists`})
      }

      file.extra = JSON.stringify(file.extra);
    } catch (e) {
      file.extra = JSON.stringify({});
    }

    return file;
  },
}
