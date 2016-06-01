import { PROJECTNAMEPage } from './app.po';

describe('open-pension App', function() {
  let page: PROJECTNAMEPage;

  beforeEach(() => {
    page = new PROJECTNAMEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('open-pension works!');
  });
});
