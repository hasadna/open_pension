import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { FiltersEffect } from './filters.effect';
import { FiltersService } from '../services/filters.service';

describe('FiltersEffect', () => {
  const filtersServiceStub = {};
  let effects: FiltersEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FiltersService, useValue: filtersServiceStub },
        FiltersEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(FiltersEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
