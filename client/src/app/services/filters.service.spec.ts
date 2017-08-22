import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FiltersService } from './filters.service';
import { Filter } from '../models/filter';
import { Quarter } from '../models/quarter';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        FiltersService,
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

  it('should create the service', inject([FiltersService], (service: FiltersService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET all the filter options',
  inject([FiltersService, MockBackend], (service: FiltersService, mockBackend: MockBackend) => {
    const quarter1 = {
      quarter_id: 4,
      year: '2012',
      month: '3',
    } as Quarter;
    const quarter2 = {
      quarter_id: 3,
      year: '2015',
      month: '1',
    } as Quarter;
    const mockResponse = [quarter1, quarter2];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    service.getQuarters().subscribe(quarters => {
      expect(quarters[0].quarter_id).toEqual(4);
      expect(quarters[0].year).toEqual('2012');
      expect(quarters[0].month).toEqual('3');
      expect(quarters[1].quarter_id).toEqual(3);
      expect(quarters[1].year).toEqual('2015');
      expect(quarters[1].month).toEqual('1');
    });
  }));

  it('should GET all the filter options',
  inject([FiltersService, MockBackend], (service: FiltersService, mockBackend: MockBackend) => {
    const filter1 = {
      fields_to_show: 'informer',
      fields_to_show_name: 'Informer',
      color: '#5f7d8c',
    } as Filter;
    const filter2 = {
      fields_to_show: 'currency',
      fields_to_show_name: 'Currency',
      color: '#ff9900',
    } as Filter;
    const mockResponse = [filter1, filter2];

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    service.getFiltersOptions().subscribe(filters => {
      expect(filters[0].fields_to_show).toEqual('informer');
      expect(filters[0].fields_to_show_name).toEqual('Informer');
      expect(filters[0].color).toEqual('#5f7d8c');
      expect(filters[1].fields_to_show).toEqual('currency');
      expect(filters[1].fields_to_show_name).toEqual('Currency');
      expect(filters[1].color).toEqual('#ff9900');
    });
  }));
});
