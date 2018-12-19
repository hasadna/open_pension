import { Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { PostService } from '../services/post.service';
import {
  PostActionTypes,
  LoadPostsAction,
  LoadPostsSuccessAction,
  LoadPostByIdAction,
  LoadPostByIdSuccessAction,
  LoadPostsByPageNumberAction,
  LoadPostsByPageNumberSuccessAction,
} from '../actions/post.actions';

@Injectable()
export class PostEffect {

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) { }

  @Effect()
  loadPosts$: Observable<Action> = this.actions$
    .ofType<LoadPostsAction>(PostActionTypes.LOAD_POSTS)
    .switchMap(_ => this.postService.getPosts()
      .map(posts => new LoadPostsSuccessAction(posts))
      .catch(() => of({ type: '' }))
    );

  @Effect()
  loadPostById$: Observable<Action> = this.actions$
    .ofType<LoadPostByIdAction>(PostActionTypes.LOAD_POST_BY_ID)
    .switchMap(postId => this.postService.getPostById(postId.payload)
      .map(postData => new LoadPostByIdSuccessAction(postData))
      .catch(() => of({ type: '' }))
    );

  @Effect()
  loadPostByPageNumber$: Observable<Action> = this.actions$
    .ofType<LoadPostsByPageNumberAction>(PostActionTypes.LOAD_POSTS_BY_PAGE_NUMBER)
    .switchMap(pageNumber => this.postService.getPostsByPageNumber(pageNumber.payload)
      .map(postData => new LoadPostsByPageNumberSuccessAction(postData))
      .catch(() => of({ type: '' }))
    );
}
