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
});
