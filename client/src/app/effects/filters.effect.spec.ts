import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { FiltersEffect } from './filters.effect';
import { FiltersService } from '../services/filters.service';
import { LoadInstrumentListAction, LoadInstrumentListSuccessAction } from '../actions/filters.actions';

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

  it('should dispatch LoadInstrumentListSuccessAction when LoadInstrumentListAction dispatched', () => {
    const response = [{
        fields_to_show: 'informer',
        fields_to_show_name: 'Informer',
        color: '#2a47ff'
    }, {
        fields_to_show: 'currency',
        fields_to_show_name: 'Currency',
        color: '#ff3800'
    }];

    actions = hot('--a-', { a: new LoadInstrumentListAction() });
    const expected = cold('--b', {b: new LoadInstrumentListSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new FiltersEffect(new Actions(actions), service);

    expect(effectsAction.loadFilters$).toBeObservable(expected);
  });
});

function createServiceStub(response: any) {
  const service = jasmine.createSpyObj('service', [ 'getFiltersOptions' ]);

  const isError = response instanceof Error;
  const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

  service.getFiltersOptions.and.returnValue(serviceResponse);
  return service;
}
