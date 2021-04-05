import mongoose from './db';
import { hashToPassword } from './user';

export type UserTokenInterface = {
  readonly token: string,
  readonly refreshToken: string,
  readonly expires: Date,
};

export const TokenSchema = new mongoose.Schema({
  token: {type: String, require: true},
  refreshToken: {type: String, require: true},
  expires: {type: Date, require: true},
});

/**
 * Creating a base token object.
 */
export function createTokenObject(): UserTokenInterface {

  const createToken = (type: string) => {
    // todo: Find a better way to generate a token string.
    return hashToPassword(`${type}_${Date.now()}`);
  };

  const expires = new Date();

  // todo: export to const.
  expires.setSeconds(expires.getSeconds() + 86400);

  return {
    token: createToken('token'),
    refreshToken: createToken('refreshToken'),
    expires
  };
}
