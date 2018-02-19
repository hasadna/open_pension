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

  it('should return an Observable<Pai> from getPai', () => {
    const response = [{
      quarter_id: 1,
      year: '2016',
      month: '1'
    }];

    service.getQuarters().subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/quarter`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
