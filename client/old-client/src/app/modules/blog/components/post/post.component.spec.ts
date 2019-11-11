import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let element: HTMLElement;
  const post: any = {
    unique_id: 'a1b2c3-d4e5f6-g8',
    title: 'This is the title',
    body: 'This is the body',
    author: 'Nir',
    created_at: '2017-02-14T10:07:20.932252Z',
    publish: '2017-02-14T10:07:20.930119Z',
    tags: [{
      'name': 'finance',
    }, {
      'name': 'pension',
    }],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SafeHtmlPipe,
        PostComponent,
      ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    // Create a dummy post.
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be in h3', () => {
    element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(element.textContent).toContain(post.title);
  });

  it('date should be next to date icon', () => {
    element = fixture.debugElement.query(By.css('.date')).nativeElement;
    expect(element.textContent).toContain('14/2/2017');
  });

  it('author should be next to person icon', () => {
    element = fixture.debugElement.query(By.css('.author')).nativeElement;
    expect(element.textContent).toContain(post.author);
  });

  it('body should be in a <p> tag element', () => {
    element = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(element.textContent).toContain(post.body);
  });
});
