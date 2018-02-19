import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reducers } from '../../reducers';
import { PaiComponent } from './pai.component';

describe('PaiComponent', () => {
  let component: PaiComponent;
  let fixture: ComponentFixture<PaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiComponent ],
      imports: [ StoreModule.forRoot(reducers) ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
