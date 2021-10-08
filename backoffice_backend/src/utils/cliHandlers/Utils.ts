import {
  ActionNameAndOptions,
  ArgsRegex,
  HandlerOptions, HandlerPayload
} from "./typesAndConsts";
import * as inquirer from 'inquirer';
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

// @ts-ignore
export function executeHandler({questions, postInterrogationHandler}: HandlerPayload, options: HandlerOptions) {
  //todo: remove from the options the values which we already got.
  console.log(options);
  inquirer.prompt(questions).then(async (answers) => {
    // todo: combine the answers and the options we got.
    console.log(answers);
    // await postInterrogationHandler(answers)
  });
}
