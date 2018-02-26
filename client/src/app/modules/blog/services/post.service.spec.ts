import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { environment } from '../../../../environments/environment';

describe('PostService', () => {
  let injector: TestBed;
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PostService ],
    });

    injector = getTestBed();
    service = injector.get(PostService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an PostResponse from getPosts', () => {
    const response = {
      count: 39,
      next: 'http://localhost:8000/api/posts/?page=2',
      previous: null,
      results: [{
        unique_id: '4e791c2b-380d-4898-8cf7-cd0c4a4c6293',
        title: 'השקעות מוסדיים ואגח אפריקה ישראל',
        body: 'יש המון גרסאות זמינות לפסקאות שללעולם לא יכיל',
        author: 'ניר גלאון',
        created_at: '2018-01-31T22:13:19.846509Z',
        publish: '2018-01-31T22:13:19.843591Z',
        tags: [{
          name: 'פננסים'
        }]
      }, {
        unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
        title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
        body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
        author: 'מערכת פנסיה פתוחה',
        created_at: '2018-01-31T22:13:19.857478Z',
        publish: '2018-01-31T22:13:19.855427Z',
        tags: [{
          name: 'פננסים'
        }, {
          name: 'אנליטיקה'
        }]
      }]
    };

    service.getPosts().subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return an PostResponse from getPostsByPageNumber', () => {
    const response = {
      count: 39,
      next: 'http://localhost:8000/api/posts/?page=2',
      previous: null,
      results: [{
        unique_id: '4e791c2b-380d-4898-8cf7-cd0c4a4c6293',
        title: 'השקעות מוסדיים ואגח אפריקה ישראל',
        body: 'יש המון גרסאות זמינות לפסקאות שללעולם לא יכיל',
        author: 'ניר גלאון',
        created_at: '2018-01-31T22:13:19.846509Z',
        publish: '2018-01-31T22:13:19.843591Z',
        tags: [{
          name: 'פננסים'
        }]
      }, {
        unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
        title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
        body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
        author: 'מערכת פנסיה פתוחה',
        created_at: '2018-01-31T22:13:19.857478Z',
        publish: '2018-01-31T22:13:19.855427Z',
        tags: [{
          name: 'פננסים'
        }, {
          name: 'אנליטיקה'
        }]
      }]
    };

    const pageNumber = '2';
    service.getPostsByPageNumber(pageNumber).subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/posts?page=${pageNumber}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return an PostResponse from getPostById', () => {
    const response = {
      unique_id: '13c49374-2453-45d1-9066-cfaac512327c',
      title: 'ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
      body: 'לורם איפסום הוא פשוט טקסטגולמי של תעשיית ההדפם.',
      author: 'מערכת פנסיה פתוחה',
      created_at: '2018-01-31T22:13:19.857478Z',
      publish: '2018-01-31T22:13:19.855427Z',
      tags: [{
        name: 'פננסים'
      }, {
        name: 'אנליטיקה'
      }]
    };

    const postId = '13c49374-2453-45d1-9066-cfaac512327c';
    service.getPostById(postId).subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/posts/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
