import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PostEffect } from './post.effect';
import { PostService } from '../services/post.service';
import {
  LoadPostsAction, LoadPostsSuccessAction,
  LoadPostByIdAction, LoadPostByIdSuccessAction,
  LoadPostsByPageNumberAction, LoadPostsByPageNumberSuccessAction,
} from '../actions/post.actions';

describe('PostEffect', () => {
  const postServiceStub = {};
  let effects: PostEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PostService, useValue: postServiceStub },
        PostEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(PostEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoadPostsSuccessAction when LoadPostsAction dispatched', () => {
    const response = {
      count: 39,
      next: 'http://localhost:8000/api/posts/?page=2',
      previous: null,
      results: [{
        unique_id: '4e791c2b-380d-4898-8cf7-cd0c4a4c6293',
        title: 'השקעות מוסדיים ואגח אפריקה ישראל',
        body: 'יש המון גרסאות זמינות לפסקאות שללעולם לא יכיל',
        author: 'ניר גלאון',
        created_at: '2018-01-31T22:13:19.846509Z',
        publish: '2018-01-31T22:13:19.843591Z',
        tags: [{
          name: 'פננסים'
        }]
      }, {
        unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
        title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
        body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
        author: 'מערכת פנסיה פתוחה',
        created_at: '2018-01-31T22:13:19.857478Z',
        publish: '2018-01-31T22:13:19.855427Z',
        tags: [{
          name: 'פננסים'
        }, {
          name: 'אנליטיקה'
        }]
      }]
    };

    actions = hot('--a-', { a: new LoadPostsAction() });
    const expected = cold('--b', {b: new LoadPostsSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PostEffect(new Actions(actions), service);

    expect(effectsAction.loadPosts$).toBeObservable(expected);
  });

  it('should dispatch LoadPostByIdSuccessAction when LoadPostByIdAction dispatched', () => {
    const response = {
      unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
      title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
      body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
      author: 'מערכת פנסיה פתוחה',
      created_at: '2018-01-31T22:13:19.857478Z',
      publish: '2018-01-31T22:13:19.855427Z',
      tags: [{
        name: 'פננסים'
      }, {
        name: 'אנליטיקה'
      }]
    };

    actions = hot('--a-', { a: new LoadPostByIdAction('13c49374-2453-45d1-9066-cfaac512327c') });
    const expected = cold('--b', {b: new LoadPostByIdSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PostEffect(new Actions(actions), service);

    expect(effectsAction.loadPostById$).toBeObservable(expected);
  });

  it('should dispatch LoadPostsByPageNumberSuccessAction when LoadPostsByPageNumberAction dispatched', () => {
    const response = {
      count: 39,
      next: 'http://localhost:8000/api/posts/?page=2',
      previous: null,
      results: [{
        unique_id: '4e791c2b-380d-4898-8cf7-cd0c4a4c6293',
        title: 'השקעות מוסדיים ואגח אפריקה ישראל',
        body: 'יש המון גרסאות זמינות לפסקאות שללעולם לא יכיל',
        author: 'ניר גלאון',
        created_at: '2018-01-31T22:13:19.846509Z',
        publish: '2018-01-31T22:13:19.843591Z',
        tags: [{
          name: 'פננסים'
        }]
      }, {
        unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
        title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
        body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
        author: 'מערכת פנסיה פתוחה',
        created_at: '2018-01-31T22:13:19.857478Z',
        publish: '2018-01-31T22:13:19.855427Z',
        tags: [{
          name: 'פננסים'
        }, {
          name: 'אנליטיקה'
        }]
      }]
    };

    actions = hot('--a-', { a: new LoadPostsByPageNumberAction('2') });
    const expected = cold('--b', {b: new LoadPostsByPageNumberSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PostEffect(new Actions(actions), service);

    expect(effectsAction.loadPostByPageNumber$).toBeObservable(expected);
  });
});

function createServiceStub(response: any) {
  const service = jasmine.createSpyObj('service', [ 'getPosts', 'getPostById', 'getPostsByPageNumber' ]);

  const isError = response instanceof Error;
  const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

  service.getPosts.and.returnValue(serviceResponse);
  service.getPostById.and.returnValue(serviceResponse);
  service.getPostsByPageNumber.and.returnValue(serviceResponse);
  return service;
}
