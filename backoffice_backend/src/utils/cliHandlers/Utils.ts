import {
  ArgsRegex, ActionNameAndOptions, HandlerOptions, HandlerPayload
} from "./typesAndConsts";
import * as inquirer from 'inquirer';
import {handlers} from "./Handlers";
import {isEmpty} from 'lodash';

export function extractActionNameAndOptions(): ActionNameAndOptions {
  const [,,action, ...optionsFromArgv] = (process.argv);
  const options = {};

  optionsFromArgv.filter(item => item).map(optionFromArgv => {
    const matches = ArgsRegex.exec(optionFromArgv);

    if (isEmpty(matches)) {
      return;
    }

    const [, option, value] = matches
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

export function executeHandler({questions, postInterrogationHandler}: HandlerPayload, options: HandlerOptions) {
  // Remove from the options the values which we already got.
  const filteredQuestions = questions.filter((question: any) => !Object.keys(options).includes(question.name));

  inquirer.prompt(filteredQuestions).then(async (answers) => {
    await postInterrogationHandler({...answers, ...options});
    process.exit(1)
  });
}
