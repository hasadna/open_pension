import { Component, Input } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { ManagingBodyDetailComponent } from '../managing-body-detail/managing-body-detail.component';
import { ManagingBody, ManagingBodyService } from './managing-body.service';

@Component({
  selector: 'op-managing-body',
  templateUrl: 'app/managing-body/managing-body.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ManagingBodyService]
})

@RouteConfig([
  { path: '/:id',               component: ManagingBodyComponent,                name: 'ManagingBodyComponent', }
])

export class ManagingBodyComponent {
  @Input() mangingBody: ManagingBody;

  constructor(
    private managingBodyService: ManagingBodyService
  ) {}

  // TODO: Method For Get The Id From The Server, Return componentId
  getManagingId() {

  }

}
