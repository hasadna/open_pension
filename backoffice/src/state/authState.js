import {atom, selector} from "recoil";
import {isEmpty} from 'lodash';
import {me} from "../api/user";

export const DummyLoginResults = {
  token: 'pizza',
  expires: new Date(),
  user: {id: 1, name: 'admin', email: 'admin@admin.com'}
};

export const authState = atom({
  key: 'authState',
  default: {
    token: null,
    expires: null,
    user: {},
  },
});

export const loggedInUserState = selector({
  key: 'loggedInUserState',
  get: async ({get}) => {
    const {user} = get(authState);

    if (isEmpty(user)) {
      const {data, error} = await me();

      if (error) {
        // truncate local storage and throw back to the front page.
      }

      return data;
    }
    return user;
  },
});

export const logoutState = selector
