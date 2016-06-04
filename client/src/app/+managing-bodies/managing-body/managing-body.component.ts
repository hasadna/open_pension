import { Component, Input } from '@angular/core';
import { Router, RouteSegment, RouteTree, ROUTER_DIRECTIVES} from '@angular/router';

import { ManagingBody } from '../shared/managing-body.model';

@Component({
  moduleId: module.id,
  selector: 'op-managing-body',
  templateUrl: 'managing-body.component.html',
  styleUrls: ['managing-body.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class ManagingBodyComponent {
  @Input() managingBody: ManagingBody;

  constructor(
    private router: Router
  ) {}

  onSelect(id: number) {
    this.router.navigate(['/managingBodies', id]);
  }
}
