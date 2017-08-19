import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { PostService } from './post.service';
import { PostResponse, Post } from '../models/post';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        PostService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
      ]
    });
  });

  it('should create the server', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET all the posts',
  inject([PostService, MockBackend], (service: PostService, mockBackend: MockBackend) => {
    const post = {
      unique_id: '12345',
      title: 'Post Title!',
      body: 'This is the post body, it should longer..',
      author: 'Nir',
      created_at: '2017-08-15T07:56:52.591178Z',
      publish: '2017-08-15T07:56:52.588385Z',
      tags: [{
        'name': 'Financial'
      }],
    } as Post;
    const mockResponse: PostResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [post],
    };

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    service.getPosts().subscribe(posts => {
      expect(posts[0].unique_id).toEqual('12345');
      expect(posts[0].title).toEqual('Post Title!');
      expect(posts[0].body).toEqual('This is the post body, it should longer..');
      expect(posts[0].author).toEqual('Nir');
      expect(posts[0].tags[0].name).toEqual('Financial');
    });
  }));

  it('should GET a post by id',
  inject([PostService, MockBackend], (service: PostService, mockBackend: MockBackend) => {
    const mockResponse = {
      unique_id: 'a1b2c3d4e5',
      title: 'Post Title!',
      body: 'This is the post body, it should longer..',
      author: 'Nir',
      created_at: '2017-08-15T07:56:52.591178Z',
      publish: '2017-08-15T07:56:52.588385Z',
      tags: [{
        'name': 'Financial'
      }],
    } as Post;

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    service.getPostById('a1b2c3d4e5').subscribe(post => {
      expect(post.unique_id).toEqual('a1b2c3d4e5');
      expect(post.title).toEqual('Post Title!');
      expect(post.body).toEqual('This is the post body, it should longer..');
      expect(post.author).toEqual('Nir');
      expect(post.tags[0].name).toEqual('Financial');
    });
  }));
});
