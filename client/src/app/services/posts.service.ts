import { Injectable } from '@angular/core';

import { Post } from '../models/post';
import { Posts } from '../models/posts';
import { DummyPost } from '../models/dummyPost';

@Injectable()
export class PostsService {

  constructor() { }

  getPosts(): Post[] {
    return Posts;
  }

  getPost(id: number): Post {
    return DummyPost;
  }
}
