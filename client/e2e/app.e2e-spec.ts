import { OpPage } from './app.po';

describe('angular-cli-test App', function() {
  let page: OpPage;

  beforeEach(() => {
    page = new OpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
