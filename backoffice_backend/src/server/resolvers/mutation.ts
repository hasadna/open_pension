import file from "./file.mutation";
import user from "./user.mutation";
import token from "./token.mutation";
import page from './page.mutation'
import pageHelper from './pageHelper.mutation';

export default {
  ...file,
  ...user,
  ...token,
  ...page,
  ...pageHelper,
}
