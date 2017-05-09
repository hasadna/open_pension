import { Action } from '@ngrx/store';
import { Post } from '../models/post';

export const LOAD_POSTS = '[POST] Load Posts';
export const LOAD_POSTS_SUCCESS = '[POST] Load Posts Success';
export const LOAD_POST_BY_ID = '[POST] Load Post By ID';
export const LOAD_POST_BY_ID_SUCCESS = '[POST] Load Post By ID Success';

export class LoadPostsAction implements Action {
  readonly type = LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) { }
}

export class LoadPostByIdAction implements Action {
  readonly type = LOAD_POST_BY_ID;

  constructor(public payload: string) { }
}

export class LoadPostByIdSuccessAction implements Action {
  readonly type = LOAD_POST_BY_ID_SUCCESS;

  constructor(public payload: any) { }
}

export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction
  | LoadPostByIdAction
  | LoadPostByIdSuccessAction;
