import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuartersService } from './quarters.service';
import { environment } from '../../environments/environment';

describe('QuartersService', () => {
  let injector: TestBed;
  let service: QuartersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ QuartersService ],
    });

    injector = getTestBed();
    service = injector.get(QuartersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
