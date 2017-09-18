import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { QuartersService } from './quarters.service';
import { Quarter } from '../models/quarter';

describe('QuartersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        QuartersService,
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

  it('should create the service', inject([QuartersService], (service: QuartersService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET all the filter options',
  inject([QuartersService, MockBackend], (service: QuartersService, mockBackend: MockBackend) => {
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
});
