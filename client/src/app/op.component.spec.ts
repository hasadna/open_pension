/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { OpComponent } from './op.component';

describe('App: Op', () => {
  beforeEach(() => {
    addProviders([OpComponent]);
  });

  it('should create the app',
    inject([OpComponent], (app: OpComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'app works!\'',
    inject([OpComponent], (app: OpComponent) => {
      expect(app.title).toEqual('app works!');
    }));
});
