import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { OpAppComponent } from '../app/op.component';

beforeEachProviders(() => [OpAppComponent]);

describe('App: Op', () => {
  it('should create the app',
      inject([OpAppComponent], (app: OpAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'op works!\'',
      inject([OpAppComponent], (app: OpAppComponent) => {
    expect(app.title).toEqual('op works!');
  }));
});
