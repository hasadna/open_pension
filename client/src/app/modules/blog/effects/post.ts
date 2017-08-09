import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PostService } from '../services/post.service';
import * as post from '../actions/post';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private postService: PostService
  ) { }

  @Effect()
  loadPosts$: Observable<Action>= this.actions$
    .ofType(post.LOAD_POSTS)
    .switchMap(() => this.postService.getPosts())
    .map(posts => new post.LoadPostsSuccessAction(posts));

  @Effect()
  loadPostById$: Observable<Action>= this.actions$
    .ofType(post.LOAD_POST_BY_ID)
    .map(toPayload)
    .switchMap((postId) => this.postService.getPostById(postId))
    .map(postData => new post.LoadPostByIdSuccessAction(postData));
}
