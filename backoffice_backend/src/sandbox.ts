import {createUser} from "./db/user";

(async () => {
  const userObject = {username: 'roysegall2', email: 'foo@gmail.com', password: '1234'};
  const results = await createUser(userObject);

  console.log(results);
})();


