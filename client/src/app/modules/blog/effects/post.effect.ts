import { Action } from '@ngrx/store';
import { of ,  Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

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
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPostsAction>(PostActionTypes.LOAD_POSTS),
    switchMap(_ => this.postService.getPosts()
      .pipe(
        map(posts => new LoadPostsSuccessAction(posts)),
        catchError(() => of({ type: '' }))
      )
    )
  );

  @Effect()
  loadPostById$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPostByIdAction>(PostActionTypes.LOAD_POST_BY_ID),
    switchMap(postId => this.postService.getPostById(postId.payload)
      .pipe(
        map(postData => new LoadPostByIdSuccessAction(postData)),
        catchError(() => of({ type: '' }))
      )
    )
  );

  @Effect()
  loadPostByPageNumber$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPostsByPageNumberAction>(PostActionTypes.LOAD_POSTS_BY_PAGE_NUMBER),
    switchMap(pageNumber => this.postService.getPostsByPageNumber(pageNumber.payload)
      .pipe(
        map(postData => new LoadPostsByPageNumberSuccessAction(postData)),
        catchError(() => of({ type: '' }))
      )
    )
  );
}
