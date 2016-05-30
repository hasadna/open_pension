import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';

import { ManagingBodyDetailComponent } from '../managing-body-detail/managing-body-detail.component';

import { ManagingBody } from './managing-body.service';

@Component({
  selector: 'op-managing-body',
  templateUrl: 'app/managing-body/managing-body.component.html',
  directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
  { path: '/managingbody/...',   component: ManagingBodyDetailComponent,  name: 'ManagingBodyDetailComponent'  }
])

export class ManagingBodyComponent {
  @Input() mangingBody: ManagingBody;

  constructor() {}

}
