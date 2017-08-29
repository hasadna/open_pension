import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as postAction from './actions/post';
import { Post } from './models/post';

@Component({
  selector: 'op-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.posts$ = this.store.select(fromRoot.getPostsEntities);
  }

  ngOnInit() {
    this.store.dispatch(new postAction.LoadPostsAction());
  }
}
