import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { reducer } from '../../../../reducers';
import { StoreModule } from '@ngrx/store';

import { DetailPostComponent } from './detail-post.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { Post } from '../../models/post';

describe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;
  let element: HTMLElement;
  const post: Post = {
    uniqueId: 'a1b2c3-d4e5f6-g8',
    title: 'This is the title',
    body: 'This is the body',
    author: 'Nir',
    createdAt: '2017-02-14T10:07:20.932252Z',
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
        DetailPostComponent,
        SafeHtmlPipe,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.provideStore(reducer),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;

    // Create a dummy post.
    component.post$ = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be in h2', () => {
    element = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(element.textContent).toContain(post.title);
  });

  it('date and author should be in meta area', () => {
    element = fixture.debugElement.query(By.css('.meta-data')).nativeElement;
    expect(element.textContent).toContain('14/2/2017');
    expect(element.textContent).toContain(post.author);
  });

  it('post body should be in the page, inside div with body class', () => {
    element = fixture.debugElement.query(By.css('#content')).nativeElement;
    expect(element.textContent).toContain(post.body);
  });
});
