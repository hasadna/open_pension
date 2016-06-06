import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ManagingBodyComponent } from './managing-body.component';

describe('Component: ManagingBody', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ManagingBodyComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ManagingBodyComponent],
      (component: ManagingBodyComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ManagingBodyComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ManagingBodyComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <op-managing-body></op-managing-body>
  `,
  directives: [ManagingBodyComponent]
})
class ManagingBodyComponentTestController {
}

