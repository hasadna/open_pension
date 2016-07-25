/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CompaniesGridComponent } from './companies-grid.component';

describe('Component: CompaniesGrid', () => {
  it('should create an instance', () => {
    let component = new CompaniesGridComponent();
    expect(component).toBeTruthy();
  });
});
