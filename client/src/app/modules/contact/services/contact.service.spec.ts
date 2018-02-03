import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { environment } from '../../../../environments/environment';

describe('ContactService', () => {
  let injector: TestBed;
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ContactService ],
    });

    injector = getTestBed();
    service = injector.get(ContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Contact> from postNewContact', () => {
    const response = {
      name: 'nir galon',
      email: 'nir@example.com',
      content: 'hi!',
    };

    service.postNewContact(response).subscribe(serviceResponse => {
      expect(serviceResponse).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.backend}/api/contact/`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });
});
