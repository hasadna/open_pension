import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'op-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.post = this.postService.getPost();
  }

}
