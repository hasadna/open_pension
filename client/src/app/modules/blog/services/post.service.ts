import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { PostResponse, Post } from '../models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PostService {
  private headers;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Accept-Language', 'he');
  }

  getPosts(): Observable<PostResponse> {
    const options = { headers: this.headers };
    return this.http.get<PostResponse>(`${environment.backend}/api/posts`, options);
  }

  getPostsByPageNumber(pageNumber: string): Observable<PostResponse> {
    const options = { headers: this.headers };
    return this.http.get<PostResponse>(`${environment.backend}/api/posts?page=${pageNumber}`, options);
  }

  getPostById(postId: string): Observable<Post> {
    const options = { headers: this.headers };
    return this.http.get<Post>(`${environment.backend}/api/posts/${postId}`, options);
  }
}
