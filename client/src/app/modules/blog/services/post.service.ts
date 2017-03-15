import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Post } from '../models/post';

@Injectable()
export class PostService {
  private headers;

  constructor(
    private http: Http,
  ) {
    this.headers = new Headers();
    this.headers.append('Accept-Language', 'he');
  }

  getPosts(): Observable<Post[]> {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get('/api/posts', options)
      .map(res => res.json().results)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
