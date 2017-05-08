import { Post } from '../models/post';
import * as post from '../actions/post';

export type  State = Post[];

const initialState: State = [{
  unique_id: '',
  title: '',
  body: '',
  author: '',
  created_at: '',
  publish: '',
  tags: [{
    'name': ''
  }],
}];

export function reducer(state = initialState, action: post.Actions): State {
  switch (action.type) {
    case post.LOAD_POSTS: {
      return initialState;
    }

    case post.LOAD_POSTS_SUCCESS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
