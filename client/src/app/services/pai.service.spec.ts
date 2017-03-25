import { TestBed, inject } from '@angular/core/testing';

import { PaiService } from './pai.service';

describe('PaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaiService]
    });
  });

  it('should ...', inject([PaiService], (service: PaiService) => {
    expect(service).toBeTruthy();
  }));
});
