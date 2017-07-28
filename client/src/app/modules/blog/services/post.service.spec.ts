import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ApolloModule, Apollo } from 'apollo-angular';

import { PostService } from './post.service';
import { provideClient } from '../../../client';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ApolloModule.forRoot(provideClient),
      ],
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

  it('should ...', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
