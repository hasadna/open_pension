import { TestBed, async } from '@angular/core/testing';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('Pipe: SafeHtml', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
