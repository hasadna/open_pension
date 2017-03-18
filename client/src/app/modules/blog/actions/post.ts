import { Action } from '@ngrx/store';
import { Post } from '../models/post';
import { type } from '../../../util';

export const ActionTypes = {
  LOAD_POSTS:                type('[POST] Load Posts'),
  LOAD_POSTS_SUCCESS:        type('[POST] Load Posts Success'),
  LOAD_POST_BY_ID:           type('[POST] Load Post By Id'),
  LOAD_POST_BY_ID_SUCCESS:   type('[POST] Load Posts By Id Success'),
};

export class LoadPostsAction implements Action {
  type = ActionTypes.LOAD_POSTS;

  constructor() { }
}

export class LoadPostsSuccessAction implements Action {
  type = ActionTypes.LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) { }
}

export class LoadPostByIdAction implements Action {
  type = ActionTypes.LOAD_POST_BY_ID;

  constructor(public payload: string) { }
}

export class LoadPostByIdSuccessAction implements Action {
  type = ActionTypes.LOAD_POST_BY_ID_SUCCESS;

  constructor(public payload: any) { }
}

export type Actions
  = LoadPostsAction
  | LoadPostsSuccessAction
  | LoadPostByIdAction
  | LoadPostByIdSuccessAction;
