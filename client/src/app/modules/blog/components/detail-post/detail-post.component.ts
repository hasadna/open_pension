import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareButtons } from '@ngx-share/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { Post } from '../../models/post.model';
import { LoadPostByIdAction } from '../../actions/post.actions';

@Component({
  selector: 'op-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  public post$: Post;
  public shareUrl: String;
  public postTags = '';

  constructor(
    public share: ShareButtons,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) {
    this.store.select(fromRoot.getSelectedPost).subscribe(
      res => {
        res.tags.map(tag => {
          if (tag.name !== '') {
            this.postTags += `${tag.name} `;
          }
        });
        return this.post$ = res;
    });
  }

  ngOnInit() {
    const postId = this.route.snapshot.params['postId'];
    this.shareUrl = `http://openpension.org/blog/${postId}`;
    this.store.dispatch(new LoadPostByIdAction(postId));
  }
}
