import { inject } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeHtmlPipe', () => {
  it('create an instance', inject([DomSanitizer], (service: DomSanitizer) => {
    const pipe = new SafeHtmlPipe(service);
    expect(pipe).toBeTruthy();
  }));
});
