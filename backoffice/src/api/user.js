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

export async function createUser({username, password, email, nameToPresent}) {
  return await sendQuery(`
    mutation {
      userCreate(username: "${username}", password: "${password}", email: "${email}", nameToPresent: "${nameToPresent}") {
        username
      }
    }
  `);
}

export async function getUsers() {
  return await sendQuery(`
    query {
      users {
      id
        username
        email
        nameToPresent
      }
    }
  `);
}

export async function getUser(id) {
  return await sendQuery(`
  query {
    user(id: "${id}") {
      username
    }
  }
  `);
}

export async function deleteUser(id) {
  // todo: handle it later on.
}
