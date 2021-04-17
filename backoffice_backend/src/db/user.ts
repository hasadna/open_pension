import * as bcrypt from 'bcrypt';
import {isEmpty} from 'loadsh';
import { createTokenObject, TokenSchema, UserTokenInterface } from './token';
const beautifyUnique = require('mongoose-beautiful-unique-validation');


import {
  BaseEntity,
  createObject,
  GetEntityArguments,
  getObject,
  TransactionResults,
  updateObject
} from './Utils';
import mongoose from './db';

export type UserInterface = BaseEntity & {
  readonly username: string,
  readonly password: string,
  readonly email: string,
  readonly createdAt?: Date,
  readonly updatedAt?: Date,
  readonly profilePictureStorageId?: number,
  readonly nameToPresent?: string,
  readonly token?: UserTokenInterface,
};

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: 'Username already exists' },
  password: {
    type: String,
    required: true,
    unique: false,
    set: (value) => {
      if (isEmpty(value)) {
        // We handle any empty values.
        return null;
      }

      // For some reason can't access the config file.
      return hashToPassword(value);
    }
  },
  email: {
    type: String,
    required: true,
    unique: 'Email already exists',
    validate: {
      validator: function(email) {
        // todo: find better validation.
        return email.includes('@');
      },
      message: 'The provided email is not a valid email',
    },
  },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  profilePictureStorageId: { type: Number },
  nameToPresent: { type: String },
  token: {
    type: TokenSchema,
  }
});

userSchema.plugin(beautifyUnique);

export const User = mongoose.model('users', userSchema);

/**
 * Hading a text to a password.
 *
 * @param stringToHash - The text to hash.
 *
 * @return The hashed text as a password.
 */
export function hashToPassword(stringToHash: string) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.saltRounds));
  return bcrypt.hashSync(stringToHash, salt);
}

/**
 * Creating a user.
 *
 * @param {UserInterface} user - The user object to create in the DB.
 */
export async function createUser(user: UserInterface): Promise<TransactionResults> {
  return await createObject(User, user);
}

/**
 * Loading a user from the DB by id or condition.
 *
 * @param {string} id - The id of the user.
 * @param {Conditions} conditions - the conditions to filter the users by.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getUser({id, conditions}: GetEntityArguments) {
  const {collections} = await getObject(User, {id, conditions});

  return collections;
}

/**
 * Updating a user.
 *
 * @param id - The ID of the uer.
 * @param newValues - The new values.
 */
export async function updateUser({id, newValues}) {
  return await updateObject(User, id, newValues);
}

/**
 * Creating a token for a user and set it in the DB.
 *
 * @param user - The user object.
 *
 * @return - The token object.
 */
export async function createToken(user: UserInterface): Promise<UserTokenInterface> {
  const token = createTokenObject();

  await updateUser({id: user._id, newValues: { token }});

  return token;
}

/**
 * Loading a user by token.
 *
 * @param token - The token to search a user by.
 *
 * @return JSON representation of the user.
 */
export async function loadUserByToken(token: string) {
  const [user] = await getUser({conditions: {'token.token': token}});

  if (!user) {
    return null;
  }

  const currentDate = new Date();

  // @ts-ignore
  const passedSeconds = (user.token.expires - currentDate) / 1000;

  if (passedSeconds > 86400) {
    return null;
  }

  return user.toJSON();
}

/**
 * Refreshing a token for a user.
 *
 * @param token - The token of the user.
 * @param refreshToken - The refresh token.
 *
 * @return Thew new token object.
 */
export async function refreshToken(token: string, refreshToken: string) {
  const [user] = await getUser({
    conditions: {
      'token.token': token,
      'token.refreshToken': refreshToken,
    }
  });

  if (isEmpty(user)) {
    throw new Error('An error occurred while trying to refresh the token');
  }

  return await createToken(user)
}

/**
 * Revoking a token for user i.e logout.
 *
 * @param user - The user object.
 */
export async function revokeToken(user: UserInterface) {
  await updateUser({id: user._id, newValues: { token: {} }});
}
