import {
  ActionNameAndOptions,
  ArgsRegex,
  HandlerOptions
} from "./typesAndConsts";
import {handlers} from "./Handlers";

export function extractActionNameAndOptions(): ActionNameAndOptions {
  const [,,action, ...optionsFromArgv] = (process.argv);

  const options = {};

  optionsFromArgv.forEach(item => {
    const [, option, value] = ArgsRegex.exec(item)
    options[option] = value;
  });

  return {action, options};
}

export function verifyPassedOptions(action: string, options: HandlerOptions) {
  if (!Object.keys(handlers).includes(action)) {
    throw new Error(`The ${action} does not exists`);
  }

  const {handler, allowedValues} = handlers[action];

  Object.keys(options).forEach((option) => {
    if (!allowedValues.includes(option)) {
      throw new Error(`The item ${option} is now allowed. Only: ${allowedValues.join(', ')}`);
    }
  });

  return handler
}
