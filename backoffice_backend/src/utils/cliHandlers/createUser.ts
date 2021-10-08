import * as inquirer from 'inquirer';
import { createUser } from '../../db/user';

export default ({username, password, email}) => {

  const questions = [
    {
      type: 'input',
      name: 'username',
      message: "Please enter username",
    },
    {
      type: 'password',
      name: 'password',
      message: "Please enter password",
      mask: '🍕'
    },
    {
      type: 'input',
      name: 'email',
      message: "Please enter email",
    },
  ];

  console.log(username, password, email);

  inquirer.prompt(questions).then(async (answers) => {
    const user = await createUser(answers);

    console.log(user);
  });
}
