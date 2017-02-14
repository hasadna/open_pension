import { OpenpensionPage } from './app.po';

describe('openpension App', function() {
  let page: OpenpensionPage;

  beforeEach(() => {
    page = new OpenpensionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
