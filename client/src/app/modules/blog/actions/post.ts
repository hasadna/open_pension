import { Action } from '@ngrx/store';
import { Post } from '../models/post';

// export const ActionTypes = {
//   LOAD_POSTS:                type('[POST] Load Posts'),
//   LOAD_POSTS_SUCCESS:        type('[POST] Load Posts Success'),
//   LOAD_POST_BY_ID:           type('[POST] Load Post By Id'),
//   LOAD_POST_BY_ID_SUCCESS:   type('[POST] Load Posts By Id Success'),
// };

export const LOAD_POSTS =  '[POST] Load Posts';
export const LOAD_POSTS_SUCCESS = '[POST] Load Posts Success';
export const LOAD_POST_BY_ID =  '[POST] Load Post By Id';
export const LOAD_POST_BY_ID_SUCCESS = '[POST] Load Posts By Id Success';
//
// export class LoadPostsAction implements Action {
//   type = ActionTypes.LOAD_POSTS;
//
//   constructor() { }
// }
//
// export class LoadPostsSuccessAction implements Action {
//   type = ActionTypes.LOAD_POSTS_SUCCESS;
//
//   constructor(public payload: Post[]) { }
// }
//
// export class LoadPostByIdAction implements Action {
//   type = ActionTypes.LOAD_POST_BY_ID;
//
//   constructor(public payload: string) { }
// }
// 
// export class LoadPostByIdSuccessAction implements Action {
//   type = ActionTypes.LOAD_POST_BY_ID_SUCCESS;
//
//   constructor(public payload: any) { }
// }

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
