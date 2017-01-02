import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.postService.getPost(+params['id'])).subscribe(x => this.post = x);
    // this.post = this.postService.getPost();
  }

}
