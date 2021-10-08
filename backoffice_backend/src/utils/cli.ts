import createUser from './cliHandlers/createUser';
const regex = /--(.*)=(.*)/gm;

const [,,action, ...optionsFromArgv] = (process.argv);
const options = {};

optionsFromArgv.forEach(item => {
  const [, option, value] = regex.exec(item)
  options[option] = value;
});

const actions = {
  createUser: {
    handler: createUser,
    allowedValues: ['username', 'password', 'email'],
  },
};

if (!Object.keys(actions).includes(action)) {
  throw new Error(`The ${action} does not exists`);
}

const {handler, allowedValues} = actions[action];

Object.keys(options).forEach((option) => {
  if (!allowedValues.includes(option)) {
    throw new Error(`The item ${option} is now allowed. Only: ${allowedValues.join(', ')}`);
  }
});

handler(allowedValues);
