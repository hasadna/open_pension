import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'op-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostsService]
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.post = this.postsService.getPost(+params['id']));
  }

}
