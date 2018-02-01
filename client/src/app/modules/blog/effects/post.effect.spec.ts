import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PostEffect } from './post.effect';
import { PostService } from '../services/post.service';

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
});
