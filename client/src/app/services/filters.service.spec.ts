import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Filter } from '../models/filter.model';
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

  it('should return an Observable<Filter[]> from getFiltersOptions', () => {
    const response: Filter[] = [{
        fields_to_show: 'informer',
        fields_to_show_name: 'Informer',
        color: '#2a47ff'
    }, {
        fields_to_show: 'currency',
        fields_to_show_name: 'Currency',
        color: '#ff3800'
    }];

    service.getFiltersOptions().subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/instrument-fields`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
