import { createUser, getUser } from '../../db/user';

import {
  createTestingServer,
  sendQuery
} from './testingUtils';
import {
  userCreationQuery,
  userQuery,
  queryUsers,
  userUpdateQuery
} from "./query.users";

describe('Testing server: user', () => {

  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  const compareUserFromResponse = (userFromDB, userFromResponse) => {
    expect(String(userFromDB._id)).toBe(userFromResponse.id);
    expect(userFromDB.email).toBe(userFromResponse.email);
    expect(userFromDB.nameToPresent).toBe(userFromResponse.nameToPresent);
    expect(userFromDB.profilePictureStorageId).toBe(userFromResponse.profilePictureStorageId);
  };

  const createValidUser = async () => {
    const {object: user} = await createUser({
      username: 'sam',
      email: 'sam@cat.com',
      password: '1234',
      nameToPresent: 'Sam the cat',
      profilePictureStorageId: 22
    });

    return user;
  }

  it('Testing the users resolvers', async () => {
    const userFromDB = await createValidUser();

    const {data: emptyFilesResponse} = await sendQuery(queryUsers, testingServer);
    const [userFromResponse] = emptyFilesResponse.users;

    compareUserFromResponse(userFromDB, userFromResponse)
  });

  it('Testing a resolver for a single user', async () => {
    const {data: emptyResponse} = await sendQuery(userQuery("1"), testingServer);
    expect(emptyResponse.user).toBeNull();

    const user = await createValidUser();

    const {data: responseWithUser} = await sendQuery(userQuery(String(user._id)), testingServer);

    compareUserFromResponse(user, responseWithUser.user)
  });

  it('Testing user mutation: creation', async () => {
    const {data: createdUserResponse} = await sendQuery(userCreationQuery({
      username: "username",
      password: "password",
      email: "email@foo.com",
      nameToPresent: "Name to present",
      profilePictureStorageId: 25
    }), testingServer);

    const userFromResponse = createdUserResponse.userCreate;
    expect(userFromResponse.username).toBe("username");
    expect(userFromResponse.email).toBe("email@foo.com");
    expect(userFromResponse.nameToPresent).toBe("Name to present");
    expect(userFromResponse.profilePictureStorageId).toBe(25);

    // Load the user from the DB.
    const userFromDB = await getUser({id: userFromResponse.id});

    compareUserFromResponse(userFromDB, userFromResponse);
  });

  it('Testing user mutation: updating', async () => {
    const user = await createValidUser();
    const id = String(user._id);
    const {data: updateUserFromResponse} = await sendQuery(userUpdateQuery({
      id,
      username: "updated username",
      password: "new password",
      email: "email2@foo.com",
      nameToPresent: "Another name to present",
      profilePictureStorageId: 35
    }), testingServer);

    const userFromResponse = updateUserFromResponse.userUpdate;
    expect(userFromResponse.username).toBe("updated username");
    expect(userFromResponse.email).toBe("email2@foo.com");
    expect(userFromResponse.nameToPresent).toBe("Another name to present");
    expect(userFromResponse.profilePictureStorageId).toBe(35);

    // Verify that the changes where applied when reload the user from the DB.
    const userFromDB = await getUser({id});
    expect(userFromDB).not.toBeNull();
    expect(userFromDB).not.toBeUndefined();

  });

  it('Testing mutation with bad values', async () => {
    const {data: createdUserResponse, errors} = await sendQuery(userCreationQuery({
      username: "",
      password: "password",
      email: "emailfoo.com",
      profilePictureStorageId: 25
    }), testingServer);

    const [error] = errors;
    const {message, extensions} = error;

    expect(message).toBe('There was an error while creating the user');
    expect(createdUserResponse.userCreate).toBeNull();
    expect(extensions.exception).toStrictEqual({
      "username": "Path `username` is required.",
      "email": "The provided email is not a valid email"
    });
  });

});
