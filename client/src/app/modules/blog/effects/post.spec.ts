import { TestBed, async, inject } from '@angular/core/testing';

import { PostEffects } from './post';
import { PostService } from '../services/post.service';
import { EffectsTestingModule } from '@ngrx/effects/testing';

describe('PostEffects', () => {
  const userServiceStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        { provide: PostService, useValue: userServiceStub },
        PostEffects,
      ]
    });
  });

  it('should create the effects', inject([PostEffects], (service: PostEffects) => {
    expect(service).toBeTruthy();
  }));
});
