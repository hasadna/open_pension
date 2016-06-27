/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';

describe('Component: Feedback', () => {
  it('should create an instance', () => {
    let component = new FeedbackComponent();
    expect(component).toBeTruthy();
  });
});
