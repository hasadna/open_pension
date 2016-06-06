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
import { ManagingBodyDetailComponent } from './managing-body-detail.component';

describe('Component: ManagingBodyDetail', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ManagingBodyDetailComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ManagingBodyDetailComponent],
      (component: ManagingBodyDetailComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ManagingBodyDetailComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ManagingBodyDetailComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <op-managing-body-detail></op-managing-body-detail>
  `,
  directives: [ManagingBodyDetailComponent]
})
class ManagingBodyDetailComponentTestController {
}

