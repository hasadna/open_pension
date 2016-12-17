import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'op-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }
}
