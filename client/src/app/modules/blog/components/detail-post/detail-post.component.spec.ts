import { StoreModule } from '@ngrx/store';
import { DebugElement } from '@angular/core';
import { ShareButtons } from '@ngx-share/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reducers } from '../../reducers';
import { Post } from '../../models/post.model';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { DetailPostComponent } from './detail-post.component';

describe('DetailPostComponent', () => {
  const shareButtonsStub = {};
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;
  let element: HTMLElement;
  const post: Post = {
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
        DetailPostComponent,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      providers: [
        { provide: ShareButtons, useValue: shareButtonsStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
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
