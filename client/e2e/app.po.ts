export class PROJECTNAMEPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('open-pension-app h1')).getText();
  }
}
