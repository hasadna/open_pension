/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CompanyItemComponent } from './company-item.component';

describe('Component: CompanyItem', () => {
  it('should create an instance', () => {
    let component = new CompanyItemComponent();
    expect(component).toBeTruthy();
  });
});
