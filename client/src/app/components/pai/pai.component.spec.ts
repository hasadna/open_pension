import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { reducer } from '../../reducers';
import { StoreModule } from '@ngrx/store';

import { PaiComponent } from './pai.component';

describe('PaiComponent', () => {
  let component: PaiComponent;
  let fixture: ComponentFixture<PaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.provideStore(reducer) ],
      declarations: [ PaiComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
