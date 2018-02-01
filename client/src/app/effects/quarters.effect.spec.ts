import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { QuartersEffect } from './quarters.effect';
import { PaiService } from '../services/pai.service';
import { QuartersService } from '../services/quarters.service';

describe('QuartersEffect', () => {
  const quartersServiceStub = {};
  const paiServiceStub = {};
  let effects: QuartersEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QuartersService, useValue: quartersServiceStub },
        { provide: PaiService, useValue: paiServiceStub },
        QuartersEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(QuartersEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
