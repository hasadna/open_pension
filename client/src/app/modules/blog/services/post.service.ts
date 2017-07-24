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
  ) {
    this.headers = new Headers();
    this.headers.append('Accept-Language', 'he');
  }

  // getPosts(): ApolloQueryObservable<any> {
  getPosts(): any {
  // getPosts(): any {
    // const options = new RequestOptions({ headers: this.headers });
    //
    // return this.http.get('/api/posts', options)
    //   .map(res => res.json().results)
    //   .catch(this.handleError);
    const AllQuarters = gql`{
      allPosts {
        uniqueId,
        title,
        body,
        author,
        createdAt,
        publish,
      }
    }`;

    return this.apollo.watchQuery<any>({
      query: AllQuarters
    })
    .map(res => res.data.allPosts);
    // .do(res => console.log(res.data.allPosts));
    // }).subscribe(({data}) => {
    //   console.log('data', data);
    // });
  }

  getPostById(postId): Observable<Post> {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(`/api/posts/${postId}`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
