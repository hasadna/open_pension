import { browser, element, by } from 'protractor';

export class OpPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('op-root h1')).getText();
  }
}
