import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PostEffects } from './post';
import { Post } from '../models/post';
import * as postAction from '../actions/post';
import { PostService } from '../services/post.service';

describe('PostEffects', () => {
  let effects: PostEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        provideMockActions(() => actions),
        // other providers
        PostService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
      ],
    });

    effects = TestBed.get(PostEffects);
  });

  it('should create the effects', inject([PostEffects], (service: PostEffects) => {
    expect(service).toBeTruthy();
  }));

  it('loadPosts$ should work', () => {
    const post1 = {
      unique_id: '111',
      title: 'someTitle',
      body: 'someBody',
      author: 'someAuthor',
      created_at: 'createdAt',
      publish: 'somePublish',
      tags: [{name: 'someName'}]
    } as Post;
    const post2 = {
      unique_id: '222',
      title: 'someTitle',
      body: 'someBody',
      author: 'someAuthor',
      created_at: 'createdAt',
      publish: 'somePublish',
      tags: [{name: 'someName'}]
    } as Post;
    const posts = [post1, post2];

    const action = new postAction.LoadPostsAction();
    const completion = new postAction.LoadPostsSuccessAction(posts);
    const someAction = new ReplaySubject(1);
    someAction.next(action);

    effects.loadPosts$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });

  it('loadPostById$ should work', () => {
    const postData = {
      unique_id: '111',
      title: 'someTitle',
      body: 'someBody',
      author: 'someAuthor',
      created_at: 'createdAt',
      publish: 'somePublish',
      tags: [{name: 'someName'}]
    } as Post;

    const action = new postAction.LoadPostsAction();
    const completion = new postAction.LoadPostByIdSuccessAction(postData);
    const someAction = new ReplaySubject(1);
    someAction.next(action);

    effects.loadPostById$.subscribe(result => {
        expect(result).toBe(completion);
      });
  });
});
