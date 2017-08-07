import { TestBed, async, inject } from '@angular/core/testing';

import { FiltersEffects } from './filters';
import { FiltersService } from '../services/filters.service';
import { EffectsTestingModule } from '@ngrx/effects/testing';

describe('FiltersEffects', () => {
  const filterServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        { provide: FiltersService, useValue: filterServiceStub },
        FiltersEffects,
      ]
    });
  });

  it('should create the effects', inject([FiltersEffects], (service: FiltersEffects) => {
    expect(service).toBeTruthy();
  }));
});
