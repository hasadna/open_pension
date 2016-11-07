/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OpComponent } from './op.component';

describe('App: Op', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OpComponent
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(OpComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
