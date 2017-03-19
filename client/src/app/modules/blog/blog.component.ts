import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as postAction from './actions/post';
import { Post } from './models/post';

@Component({
  selector: 'op-blog',
  template: `
    <section>
      <h2>בלוג</h2>
      <div *ngFor="let post of posts$ | async ">
        <op-post [post]="post"></op-post>
      </div>
    </section>
  `,
  styles: [`
    section {
      margin-top: 100px;
      color: #4a4a4a;
      direction: rtl;
    }

    h2 {
      font-weight: bold;
      font-size: 23px;
    }

    div {
      margin-top: 30px;
    }
  `]
})
export class BlogComponent implements OnInit {
  private posts$: Observable<Post[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.posts$ = this.store.select(fromRoot.getPostsEntities);
  }

  ngOnInit() {
    this.store.dispatch(new postAction.LoadPostsAction());
  }
}
