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
  public countPage: Array<number> = [];
  public nextPage: string = '';
  public previousPage: string = '';

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.posts$ = this.store.select(fromRoot.getPostsEntities);
    this.store.select(fromRoot.getPostsCount).subscribe(res => this.countPage = Array(Math.ceil(Number(res) / 10)).fill(0));
    this.store.select(fromRoot.getPostsNext).subscribe(res => this.nextPage = res);
    this.store.select(fromRoot.getPostsPrevious).subscribe(res => this.previousPage = res);
  }

  ngOnInit() {
    this.store.dispatch(new postAction.LoadPostsAction());
  }

  loadPage(page) {
    console.log('page', page);
  }
}
