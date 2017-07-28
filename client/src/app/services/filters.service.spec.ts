import { TestBed, inject } from '@angular/core/testing';

import { FiltersService } from './filters.service';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersService]
    });
  });

  it('should ...', inject([FiltersService], (service: FiltersService) => {
    expect(service).toBeTruthy();
  }));
});
