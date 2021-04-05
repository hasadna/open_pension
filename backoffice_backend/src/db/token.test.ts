import { createTokenObject } from './token';

describe('Token', () => {

  it('Should return a valid token object', () => {
    const {token, refreshToken, expires} = createTokenObject();

    expect(token).not.toBeNull();
    expect(refreshToken).not.toBeNull();
    expect(expires).not.toBeNull();
  });

});
