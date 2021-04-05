import {sendQuery} from "./core";

export async function loginQuery({username, email, password}) {
  const results = await sendQuery(`
    mutation {
      tokenCreate(username: "${username}", email: "${email}", password: "${password}") {
        token 
        refreshToken
        expires
      }
    }
  `);
  const {data: {tokenCreate: data}, error} = results;
  return {data, error}
}

export async function me() {
  const results = await sendQuery(`
    query {
      me {
        username,
        nameToPresent
      }
    }
  `);

  const {data: {me: data}, error} = results;
  return {data, error}
}
