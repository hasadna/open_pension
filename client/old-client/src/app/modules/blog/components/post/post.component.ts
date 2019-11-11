import { Component, Input } from '@angular/core';

import { Post } from '../../models/post.model';

@Component({
  selector: 'op-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;
}
