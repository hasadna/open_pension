import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';

import { ManagingBody } from '../shared/managing-body.model';

@Component({
  moduleId: module.id,
  selector: 'op-managing-body',
  templateUrl: 'managing-body.component.html',
  styleUrls: ['managing-body.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class ManagingBodyComponent {
  @Input() mangingBody: ManagingBody;

  constructor() {}
  
}
