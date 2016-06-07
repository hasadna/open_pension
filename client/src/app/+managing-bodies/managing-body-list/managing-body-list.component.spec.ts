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
import { ManagingBodyListComponent } from './managing-body-list.component';

describe('Component: ManagingBodyList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ManagingBodyListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ManagingBodyListComponent],
      (component: ManagingBodyListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ManagingBodyListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ManagingBodyListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <op-managing-body-list></op-managing-body-list>
  `,
  directives: [ManagingBodyListComponent]
})
class ManagingBodyListComponentTestController {
}

