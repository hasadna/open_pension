import { AngularCliTestPage } from './app.po';

describe('angular-cli-test App', function() {
  let page: AngularCliTestPage;

  beforeEach(() => {
    page = new AngularCliTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
