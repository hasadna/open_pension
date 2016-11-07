/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaiComponent } from './pai.component';

describe('PaiComponent', () => {
  let component: PaiComponent;
  let fixture: ComponentFixture<PaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiComponent ]
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
