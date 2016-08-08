/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { PiComponent } from './pi.component';

describe('Component: Pi', () => {
  it('should create an instance', () => {
    let component = new PiComponent();
    expect(component).toBeTruthy();
  });
});
