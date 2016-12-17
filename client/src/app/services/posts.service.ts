import { Injectable } from '@angular/core';

import { Post } from '../models/post';
import { Posts } from '../models/posts';

@Injectable()
export class PostsService {

  constructor() { }

  getPosts(): Post[] {

  	return Posts;
  }

}
