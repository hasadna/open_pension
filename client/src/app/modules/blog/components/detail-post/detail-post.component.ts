import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as postAction from '../../actions/post';
import { Post } from '../../models/post';

@Component({
  selector: 'op-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  public post$: Observable<Post>;

  constructor(
      private store: Store<fromRoot.State>,
      private route: ActivatedRoute,
  ) {
    this.post$ = this.store.select(fromRoot.getSelectedPost);
  }

  ngOnInit() {
    const postId = this.route.snapshot.params['postId'];
    this.store.dispatch(new postAction.LoadPostByIdAction(postId));
  }
}
