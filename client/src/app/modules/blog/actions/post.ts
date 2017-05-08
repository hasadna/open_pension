import { Action } from '@ngrx/store';
import { Post } from '../models/post';

export const LOAD_POSTS = '[POST] Load Posts';
export const LOAD_POSTS_SUCCESS = '[POST] Load Posts Successs';

export class LoadPostsAction implements Action {
  readonly type = LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) { }
}

export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction;
