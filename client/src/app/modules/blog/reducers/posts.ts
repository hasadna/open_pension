import { Post } from '../models/post';
import * as post from '../actions/post';

export interface State {
  entities: Post[];
  selectedPost: Post;
};

const initialState: State = {
  entities: [{
    uniqueId: '',
    title: '',
    body: '',
    author: '',
    createdAt: '',
    publish: '',
  }],
  selectedPost: {
    uniqueId: '',
    title: '',
    body: '',
    author: '',
    createdAt: '',
    publish: '',
  }
};

export function reducer(state = initialState, action: post.Actions): State {
  switch (action.type) {
    case post.LOAD_POSTS: {
      return Object.assign({}, state);
    }

    case post.LOAD_POST_BY_ID: {
      return Object.assign({}, state);
    }

    case post.LOAD_POSTS_SUCCESS: {
      const newEntits = { entities: action.payload };

      return Object.assign({}, state, newEntits);
    }

    case post.LOAD_POST_BY_ID_SUCCESS: {
      const newSelectedPost = { selectedPost: action.payload };

      return Object.assign({}, state, newSelectedPost);
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getSelectedPost = (state: State) => state.selectedPost;
