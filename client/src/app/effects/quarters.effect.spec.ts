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
import { LoadPaiAfterNewFilterSuccessAction } from '../actions/pai.actions';
import { LoadQuartersAction, LoadQuartersSuccessAction, SelectNewQuarterAction } from '../actions/quarter.actions';

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

  it('should dispatch LoadQuartersSuccessAction when LoadQuartersAction dispatched', () => {
    const response = [{
      quarter_id: 1,
      year: '2016',
      month: '1'
    }];

    actions = hot('--a-', { a: new LoadQuartersAction() });
    const expected = cold('--b', {b: new LoadQuartersSuccessAction(response)});
    const service = createServiceStub(response);
    const paiService = createServiceStub(response);
    const effectsAction = new QuartersEffect(new Actions(actions), service, paiService);

    expect(effectsAction.loadQuarters$).toBeObservable(expected);
  });

  it('should dispatch LoadPaiAfterNewFilterSuccessAction when SelectNewQuarterAction dispatched', () => {
    const newQuarter = '2016-1';
    const response = {
      name: 'base',
      children: [{
        name: 'base',
        size: 1160959.768,
      }],
    };

    actions = hot('--a-', { a: new SelectNewQuarterAction(newQuarter) });
    const expected = cold('--b', {b: new LoadPaiAfterNewFilterSuccessAction(response)});
    const service = createServiceStub(response);
    const paiService = createServiceStub(response);
    const effectsAction = new QuartersEffect(new Actions(actions), service, paiService);

    expect(effectsAction.loadPaiAfterNewQuarter$).toBeObservable(expected);
  });
});

function createServiceStub(response: any) {
  const service = jasmine.createSpyObj('service', [ 'getQuarters', 'getPaiWithFilters' ]);

  const isError = response instanceof Error;
  const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

  service.getQuarters.and.returnValue(serviceResponse);
  service.getPaiWithFilters.and.returnValue(serviceResponse);
  return service;
}
