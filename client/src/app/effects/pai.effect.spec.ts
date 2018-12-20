import 'rxjs/add/observable/of';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { of, Observable, throwError, ReplaySubject } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { PaiEffect } from './pai.effect';
import { PaiService } from '../services/pai.service';
import { SelectNewFilterAction, ChangeLayerOfFilterAction } from '../actions/filters.actions';
import { LoadPaiAction, LoadPaiSuccessAction, LoadPaiAfterNewFilterSuccessAction } from '../actions/pai.actions';

describe('PaiEffect', () => {
  const paiServiceStub = {};
  let effects: PaiEffect;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaiService, useValue: paiServiceStub },
        PaiEffect,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(PaiEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch LoadPaiSuccessAction when LoadPaiAction dispatched', () => {
    const response = {
      name: 'base',
      children: [],
    };

    actions = hot('--a-', { a: new LoadPaiAction() });
    const expected = cold('--b', {b: new LoadPaiSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PaiEffect(new Actions(actions), service);

    expect(effectsAction.loadPai$).toBeObservable(expected);
  });

  it('should dispatch LoadPaiAfterNewFilterSuccessAction when SelectNewFilterAction dispatched', () => {
    const response = {
      name: 'base',
      children: [{
        name: 'base',
        size: 1160959.768,
      }],
    };

    actions = hot('--a-', { a: new SelectNewFilterAction('currency') });
    const expected = cold('--b', {b: new LoadPaiAfterNewFilterSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PaiEffect(new Actions(actions), service);

    expect(effectsAction.loadPaiAfterNewFilter$).toBeObservable(expected);
  });

  it('should dispatch LoadPaiAfterNewFilterSuccessAction when ChangeLayerOfFilterAction dispatched', () => {
    const response = {
      name: 'base',
      children: [{
        name: 'שקל חדש',
        size: 761528.092,
      }, {
        name: 'אירו',
        size: 18448.151,
      }, {
        name: 'יין יפני',
        size: 2792.143,
      }, {
        name: 'לירה שטרלינג',
        size: 3424.247,
      }, {
        name: 'דולר אמריקאי',
        size: 374767.135,
      }],
    };

    actions = hot('--a-', { a: new ChangeLayerOfFilterAction() });
    const expected = cold('--b', {b: new LoadPaiAfterNewFilterSuccessAction(response)});
    const service = createServiceStub(response);
    const effectsAction = new PaiEffect(new Actions(actions), service);

    expect(effectsAction.changeFilterLayer$).toBeObservable(expected);
  });
});

function createServiceStub(response: any) {
  const service = jasmine.createSpyObj('service', [ 'getPai', 'getPaiWithFilters', 'getPaiWithFilters' ]);

  const isError = response instanceof Error;
  const serviceResponse = isError ? throwError(response) : of(response);

  service.getPai.and.returnValue(serviceResponse);
  service.getPaiWithFilters.and.returnValue(serviceResponse);
  service.getPaiWithFilters.and.returnValue(serviceResponse);
  return service;
}
