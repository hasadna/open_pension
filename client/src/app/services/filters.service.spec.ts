import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FiltersService } from './filters.service';
import { environment } from '../../environments/environment';

describe('FiltersService', () => {
  let injector: TestBed;
  let service: FiltersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FiltersService ],
    });

    injector = getTestBed();
    service = injector.get(FiltersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
