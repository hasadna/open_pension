import { Action } from '@ngrx/store';
import { PostResponse } from '../models/post';

export const LOAD_POSTS = '[POST] Load Posts';
export const LOAD_POSTS_SUCCESS = '[POST] Load Posts Success';
export const LOAD_POST_BY_ID = '[POST] Load Post By ID';
export const LOAD_POST_BY_ID_SUCCESS = '[POST] Load Post By ID Success';
export const LOAD_POSTS_BY_PAGE_NUMBER = '[POST] Load Posts By Page Number';
export const LOAD_POSTS_BY_PAGE_NUMBER_SUCCESS = '[POST] LoadPosts By Page Number Success';

export class LoadPostsAction implements Action {
  readonly type = LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: PostResponse) { }
}

export class LoadPostByIdAction implements Action {
  readonly type = LOAD_POST_BY_ID;

  constructor(public payload: string) { }
}

export class LoadPostByIdSuccessAction implements Action {
  readonly type = LOAD_POST_BY_ID_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadPostsByPageNumberAction implements Action {
  readonly type = LOAD_POSTS_BY_PAGE_NUMBER;

  constructor(public payload: string) { }
}

export class LoadPostsByPageNumberSuccessAction implements Action {
  readonly type = LOAD_POSTS_BY_PAGE_NUMBER_SUCCESS;

  constructor(public payload: PostResponse) { }
}

export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction
  | LoadPostByIdAction
  | LoadPostByIdSuccessAction
  | LoadPostsByPageNumberAction
  | LoadPostsByPageNumberSuccessAction;
