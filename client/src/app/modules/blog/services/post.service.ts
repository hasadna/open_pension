import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { PostResponse, Post } from '../models/post';

import { environment } from '../../../../environments/environment';

@Injectable()
export class PostService {
  private headers;

  constructor(
    private http: Http,
  ) {
    this.headers = new Headers();
    this.headers.append('Accept-Language', 'he');
  }

  getPosts(): Observable<PostResponse> {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(`${environment.backend}/api/posts`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPostById(postId): Observable<Post> {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(`${environment.backend}/api/posts/${postId}`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
