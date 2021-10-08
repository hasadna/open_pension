import { createUser } from '../../db/user';
import {HandlerPayload} from "./typesAndConsts";

export default (): HandlerPayload => {
  return {
    questions: [
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
    ],
    postInterrogationHandler: async (answers) => {
      const user = await createUser(answers);

      console.log(user);
    }
  };
}
