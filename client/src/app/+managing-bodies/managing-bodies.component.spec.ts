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
import { ManagingBodiesComponent } from './managing-bodies.component';

describe('Component: ManagingBodies', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ManagingBodiesComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ManagingBodiesComponent],
      (component: ManagingBodiesComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ManagingBodiesComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ManagingBodiesComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <op-managing-bodies></op-managing-bodies>
  `,
  directives: [ManagingBodiesComponent]
})
class ManagingBodiesComponentTestController {
}

