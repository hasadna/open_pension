import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let element: HTMLElement;
  const posts = {
    json: () => {
      return [{
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
      }, {
        unique_id: 'a1b2c3-d4e5f6-g8',
        title: 'This is the title2',
        body: 'This is the body2',
        author: 'Adi',
        created_at: '2017-02-15T10:07:20.932252Z',
        publish: '2017-02-15T10:07:20.930119Z',
        tags: [{
          'name': 'foo',
        }, {
          'name': 'bar',
        }],
      }];
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [ StoreModule.forRoot(reducers) ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;

    // Create a dummy posts.
    component.posts$ = Observable.create(() => this.posts);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a "blog" title', () => {
    element = fixture.debugElement.query(By.css('section')).nativeElement;
    expect(element.textContent).toContain('בלוג');
  });
});
