import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from '../../reducers';
import { Post } from '../../models/post.model';
import { LoadPostsByPageNumberAction } from '../../actions/post.actions';

@Component({
  selector: 'op-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public posts$: Observable<Post[]>;
  public currentPage = '1';
  public countPage: Array<number> = [];
  public nextPage = '';
  public previousPage = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) {
    this.posts$ = this.store.select(fromRoot.getPostsEntities);
    this.store.select(fromRoot.getPostsCount).subscribe(res => this.countPage = Array(Math.ceil(Number(res) / 10)).fill(0));
    this.store.select(fromRoot.getPostsNext).subscribe(res => this.nextPage = res);
    this.store.select(fromRoot.getPostsPrevious).subscribe(res => this.previousPage = res);
  }

  ngOnInit() {
    this.currentPage = this.route.snapshot.params['pageNumber'] || 1;
    this.store.dispatch(new LoadPostsByPageNumberAction(this.currentPage));
  }

  loadNextPage() {
    const pageToLoad = String(Number(this.currentPage) + 1);
    this.loadNewPage(pageToLoad);
  }

  loadPreviousPage() {
    const pageToLoad = String(Number(this.currentPage) - 1);
    this.loadNewPage(pageToLoad);
  }

  loadNewPage(pageToLoad: string) {
    this.currentPage = pageToLoad;
    this.location.replaceState(`blog/${pageToLoad}`);
    this.store.dispatch(new LoadPostsByPageNumberAction(pageToLoad));
  }
}
