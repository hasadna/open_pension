import { StoreModule } from '@ngrx/store';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { reducers } from '../reducers';
import { PaiService } from './pai.service';
import { environment } from '../../environments/environment';

describe('PaiService', () => {
  let injector: TestBed;
  let service: PaiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
      ],
      providers: [ PaiService ],
    });

    injector = getTestBed();
    service = injector.get(PaiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Pai> from getPai', () => {
    const response = {
      name: 'base',
      children: [{
        name: 'base',
        size: 1160959.768,
      }],
    };

    service.getPai().subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/filter-pai`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return an Observable<Pai> from getPaiWithFilters', () => {
    const response = {
      name: 'base',
      children: [{
        name: 'base',
        size: 1160959.768,
      }],
    };

    service.getPaiWithFilters().subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const query = '&quarter=0';
    const req = httpMock.expectOne(`${environment.backend}/filter-pai?${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
