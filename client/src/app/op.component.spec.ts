/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OpComponent } from './app.component';

describe('OpComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OpComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(OpComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
