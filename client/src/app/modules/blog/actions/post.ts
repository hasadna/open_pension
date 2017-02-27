import { Action } from '@ngrx/store';
import { Post } from '../models/post';
import { type } from '../../../util';

export const ActionTypes = {
  LOAD_POSTS:                type('[POST] Load Posts'),
  LOAD_POSTS_SUCCESS:        type('[POST] Load Posts Success'),
};

export class LoadPostsAction implements Action {
  type = ActionTypes.LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  type = ActionTypes.LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) { }
}

export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction;
