/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PrivacyComponent } from './privacy.component';

describe('Component: Privacy', () => {
  it('should create an instance', () => {
    let component = new PrivacyComponent();
    expect(component).toBeTruthy();
  });
});
