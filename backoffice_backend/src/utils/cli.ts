import {
  extractActionNameAndOptions, executeHandler, verifyPassedOptions
} from "./cliHandlers/Utils";

const {action, options} = extractActionNameAndOptions();
const handler = verifyPassedOptions(action, options);

executeHandler(handler());
