import file from './file.query';
import user from './user.query';
import page from './page.query';
import pageHelper from './pageHelper.query';

export default {
  ...file,
  ...user,
  ...page,
  ...pageHelper,
};
