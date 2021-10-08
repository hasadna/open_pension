import {extractActionNameAndOptions, verifyPassedOptions} from "./cliHandlers/Utils";

const {action, options} = extractActionNameAndOptions();
const handler = verifyPassedOptions(action, options);

handler(options);
