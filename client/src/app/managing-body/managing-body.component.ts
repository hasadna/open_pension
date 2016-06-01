import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ManagingBodyDetailComponent } from '../managing-body-detail/managing-body-detail.component';
import { ManagingBody } from './managing-body.service';

@Component({
  moduleId: module.id,
  selector: 'op-managing-body',
  templateUrl: 'managing-body.component.html',
  directives: [ROUTER_DIRECTIVES],
})

export class ManagingBodyComponent {
  @Input() mangingBody: ManagingBody;

  constructor() {}

}
