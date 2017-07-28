import { TestBed, async, inject } from '@angular/core/testing';

import { PaiEffects } from './pai';
import { PaiService } from '../services/pai.service';
import { EffectsTestingModule } from '@ngrx/effects/testing';

describe('PaiEffects', () => {
  const paiServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        { provide: PaiService, useValue: paiServiceStub },
        PaiEffects,
      ]
    });
  });

  it('should create the effects', inject([PaiEffects], (service: PaiEffects) => {
    expect(service).toBeTruthy();
  }));
});
