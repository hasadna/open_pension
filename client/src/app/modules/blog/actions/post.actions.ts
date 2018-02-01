import { Action } from '@ngrx/store';

import { PostResponse } from '../models/post.model';

export enum PostActionTypes {
  LOAD_POSTS = '[Post] Load Posts',
  LOAD_POSTS_SUCCESS = '[Post] Load Posts Success',
  LOAD_POSTS_FAILED = '[Post] Load Posts Failed',
  LOAD_POST_BY_ID = '[Post] Load Post By Id',
  LOAD_POST_BY_ID_SUCCESS = '[Post] Load Post By Id Success',
  LOAD_POST_BY_ID_FAILED = '[Post] Load Post By Id Failed',
  LOAD_POSTS_BY_PAGE_NUMBER = '[Post] Load Posts By Page Number',
  LOAD_POSTS_BY_PAGE_NUMBER_SUCCESS = '[Post] Load Posts By Page Number Success',
  LOAD_POSTS_BY_PAGE_NUMBER_FAILED = '[Post] Load Posts By Page Number Failed',
}

export class LoadPostsAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_SUCCESS;

  constructor(public payload: PostResponse) { }
}

export class LoadPostsFailedAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_FAILED;

  constructor() { }
}

export class LoadPostByIdAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID;

  constructor(public payload: string) { }
}

export class LoadPostByIdSuccessAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadPostByIdFailedAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID_FAILED;

  constructor() { }
}

export class LoadPostsByPageNumberAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_BY_PAGE_NUMBER;

  constructor(public payload: string) { }
}

export class LoadPostsByPageNumberSuccessAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_BY_PAGE_NUMBER_SUCCESS;

  constructor(public payload: PostResponse) { }
}

export class LoadPostsByPageNumberFailedAction implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_BY_PAGE_NUMBER_FAILED;

  constructor() { }
}

export type PostActions
  = LoadPostsAction
  | LoadPostsSuccessAction
  | LoadPostsFailedAction
  | LoadPostByIdAction
  | LoadPostByIdSuccessAction
  | LoadPostByIdFailedAction
  | LoadPostsByPageNumberAction
  | LoadPostsByPageNumberSuccessAction
  | LoadPostsByPageNumberFailedAction;
