import { Post } from '../models/post';
import * as post from '../actions/post';

export interface  State {
  entities: Post[];
  selectedPost: Post;
};

const initialState: State = {
  entities: [{
    unique_id: '',
    title: '',
    body: '',
    author: '',
    created_at: '',
    publish: '',
    tags: [{
      'name': ''
    }],
  }],
  selectedPost: {
    unique_id: '',
    title: '',
    body: '',
    author: '',
    created_at: '',
    publish: '',
    tags: [{
      'name': ''
    }],
  }
};

export function reducer(state = initialState, action: post.Actions): State {
  switch (action.type) {
    case post.ActionTypes.LOAD_POSTS: {
      return Object.assign({}, state);
    }

    case post.ActionTypes.LOAD_POST_BY_ID: {
      return Object.assign({}, state);
    }

    case post.ActionTypes.LOAD_POSTS_SUCCESS: {
      const newEntits = { entities: action.payload };

      return Object.assign({}, state, newEntits);
    }

    case post.ActionTypes.LOAD_POST_BY_ID_SUCCESS: {
      const newEntits = { selectedPost: action.payload };

      return Object.assign({}, state, newEntits);
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedPost = (state: State) => state.selectedPost;
