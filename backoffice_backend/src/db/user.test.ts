import * as bcrypt from 'bcrypt';

import {
  createToken, createUser, getUser, loadUserByToken, refreshToken,
  revokeToken, User
} from './user';

describe('Testing user', () => {

  const baseUser = {
    username: '',
    password: '',
    email: '',
  };

  const validUser = {
    username: 'username',
    password: 'password',
    email: 'test@example.com',
  };

  const createValidUser = async () => {
    const {object: user} = await createUser(validUser);

    return user;
  }

  const createUserAndToken = async () => {
    const {object: user} = await createUser(validUser);
    const token = await createToken(user);

    return {user, token};
  };

  const createUserAndVerifyExpects = async (matrix) => {
      const {baseUser, expected} = matrix;
      const {errors, object} = await createUser(baseUser);
      expect(expected.object).toBe(object);
      expect(expected.errors).toStrictEqual(errors);
  };

  it('Should failed when creating a user without details', async () => {

    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          username: 'Path `username` is required.',
          password: 'Path `password` is required.',
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a username to object.
    baseUser.username = 'username';
    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          password: 'Path `password` is required.',
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a password to the object.
    baseUser.password = 'password';
    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a password to the object.
    baseUser.email = 'test@example.com';
    const {errors, object: user} = await createUser(baseUser);
    expect(user).not.toBeNull();
    expect(errors).toBeNull();
  });

  it('Should failed when passing wrong email', async () => {
    baseUser.username = 'username';
    baseUser.password = 'password';
    baseUser.email = 'email';

    const {errors, object: user} = await createUser(baseUser);
    expect(user).toBeNull();
    expect(errors).toStrictEqual({
      email: 'The provided email is not a valid email'
    });
  });

  it('Should encrypt the password', async () => {
    const {_doc: user} = await createValidUser();

    const {_doc: loadedUser} = await getUser({id: user._id})
    expect(loadedUser.password).not.toBeNull();
    expect(loadedUser.password).not.toBe('password');

    const passwordMatch = await bcrypt.compare('password', loadedUser.password);
    expect(passwordMatch).toBeTruthy();
  });

  it('Should auto fill the created at when creating a user', async () => {
    const user = await createValidUser();
    expect(user.createdAt).not.toBeUndefined();
    expect(user.createdAt).not.toBeNull();
  });

  it('Should create a valid token for user', async() => {
    const user = await createValidUser();
    let userFromDB = await getUser({id: user._id});
    expect(userFromDB.token).toBeUndefined();
    await createToken(user);

    userFromDB = await getUser({id: user._id});
    const {token, refreshToken, expires} = userFromDB.token;

    expect(token).not.toBeNull();
    expect(refreshToken).not.toBeNull();
    expect(expires).not.toBeNull();
  });

  it('Loading user when passing token', async () => {
    const {user, token} = await createUserAndToken();
    const loadedUserByToken = await loadUserByToken(token.token);
    expect(String(user._id)).toBe(String(loadedUserByToken._id));
  });

  it('Should not load user when token is expires', async () => {
    const {user, token} = await createUserAndToken();

    const reloadedUser = await getUser({id: user._id});

    // Change the expires of the token to now.
    reloadedUser.token.expires.setSeconds(reloadedUser.token.expires.getSeconds() + 86400);
    await User.findOneAndUpdate(
      {_id: user._id}, { token: reloadedUser.token }
    )

    const loadedUserByToken = await loadUserByToken(token.token);

    expect(loadedUserByToken).toBeNull();
  });

  it('Should create a new token for user when passing the refresh token', async () => {
    const {user, token} = await createUserAndToken();

    const refreshedToken = await refreshToken(token.token, token.refreshToken);
    const reloadedUser = await getUser({id: user._id});

    expect(token.token).not.toBe(reloadedUser.token.token);
    expect(refreshedToken.token).toBe(reloadedUser.token.token);
  });

  it('Should not load the user after refreshing the token', async () => {
    const {user, token} = await createUserAndToken();
    const userByToken = await loadUserByToken(token.token);
    expect(String(userByToken._id)).toBe(String(user._id));

    // Refresh the token and verify we cannot load the user again with the
    // original token.
    const refreshedToken = await refreshToken(token.token, token.refreshToken);

    const userByTokenAfterRefresh = await loadUserByToken(token.token);
    expect(userByTokenAfterRefresh).toBeNull();

    const userFromNewRefreshToken = await loadUserByToken(refreshedToken.token);
    expect(String(userFromNewRefreshToken._id)).toBe(String(user._id));
  });

  it('Should not validate user when the token was removed for the user', async () => {
    const {user, token} = await createUserAndToken();

    const userByToken = await loadUserByToken(token.token);
    expect(String(userByToken._id)).toBe(String(user._id));

    // Deleting the token.
    await revokeToken(user);

    // Check the token was removed form the user object.
    const userByTokenAfterRevoking = await loadUserByToken(token.token);
    expect(userByTokenAfterRevoking).toBeNull();

    const userFromDB = await getUser({id: user._id});
    expect(userFromDB.token.token).toBeUndefined();
  });
});
