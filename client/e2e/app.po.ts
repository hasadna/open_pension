export class OpPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('op-app h1')).getText();
  }
}
