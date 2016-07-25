/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CompaniesService } from './companies.service';

describe('Service: Companies', () => {
  beforeEach(() => {
    addProviders([CompaniesService]);
  });

  it('should ...',
    inject([CompaniesService],
      (service: CompaniesService) => {
        expect(service).toBeTruthy();
      }));
});
