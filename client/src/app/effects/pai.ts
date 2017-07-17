import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PaiService } from '../services/pai.service';
import * as pai from '../actions/pai';

@Injectable()
export class PaiEffects {
  constructor(
    private actions$: Actions,
    private postService: PaiService
  ) { }

  @Effect()
  loadPai$: Observable<Action>= this.actions$
    .ofType(pai.LOAD_PAI)
    .switchMap(() => this.postService.getPai())
    .map(data => new pai.LoadPaiSuccessAction(data));
}
