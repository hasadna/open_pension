import { TestBed, async } from '@angular/core/testing';
import { BlogModule } from './blog.module';

describe('BlogModule', () => {
  let blogModule;

  beforeEach(() => {
    blogModule = new BlogModule();
  });

  it('should create an instance', () => {
    expect(blogModule).toBeTruthy();
  });
});
