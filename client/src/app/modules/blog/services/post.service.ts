import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import { Post } from '../models/post';

@Injectable()
export class PostService {
  private headers;

  constructor(
    private http: Http,
    private apollo: Apollo,
  ) {}

  getPosts(): Observable<Post[]>  {
    const AllQuarters = gql`{
      allPosts {
        uniqueId,
        titleHe,
        bodyHe,
        authorHe,
        createdAt,
        publish,
      }
    }`;

    return this.apollo.watchQuery<any>({
      query: AllQuarters
    })
    .map(res => res.data.allPosts);
  }

  getPostById(postId): Observable<Post> {
    const AllQuarters = gql`query {
      post(uniqueId: "${postId}") {
        uniqueId,
        titleHe,
        bodyHe,
        authorHe,
        createdAt,
        publish,
      }
    }`;

    return this.apollo.watchQuery<any>({
      query: AllQuarters
    })
    .map(res => res.data.post);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
