import { Component, Input } from '@angular/core';

import { ManagingBody } from '../shared/managing-body.model';

@Component({
  moduleId: module.id,
  selector: 'op-managing-body',
  templateUrl: 'managing-body.component.html',
  styleUrls: ['managing-body.component.css']
})

export class ManagingBodyComponent {
  @Input() mangingBody: ManagingBody;

  constructor() {}

}
