/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CompaniesComponent } from './companies.component';

describe('Component: Companies', () => {
  it('should create an instance', () => {
    let component = new CompaniesComponent();
    expect(component).toBeTruthy();
  });
});
