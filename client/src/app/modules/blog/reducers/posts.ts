import { Post } from '../models/post';
import * as post from '../actions/post';

export interface State {
  count: string;
  next: string;
  previous: string;
  entities: Post[];
  selectedPost: Post;
}

const initialState: State = {
  count: '',
  next: '',
  previous: '',
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
    case post.LOAD_POSTS: {
      return Object.assign({}, state);
    }

    case post.LOAD_POST_BY_ID: {
      return Object.assign({}, state);
    }

    case post.LOAD_POSTS_SUCCESS: {
      const newEntits = {
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        entities: action.payload.results,
      };

      return Object.assign({}, state, newEntits);
    }

    case post.LOAD_POSTS_BY_PAGE_NUMBER_SUCCESS: {
      const newEntits = {
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        entities: action.payload.results,
      };

      return Object.assign({}, state, newEntits);
    }

    case post.LOAD_POST_BY_ID_SUCCESS: {
      const newEntits = { selectedPost: action.payload };

      return Object.assign({}, state, newEntits);
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getCount = (state: State) => state.count;
export const getNext = (state: State) => state.next;
export const getPrevious = (state: State) => state.previous;
export const getSelectedPost = (state: State) => state.selectedPost;
