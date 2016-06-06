import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { ManagingBodyDetailComponent } from './managing-body-detail/managing-body-detail.component';
import { ManagingBodyListComponent } from './managing-body-list/managing-body-list.component';

@Component({
  moduleId: module.id,
  selector: 'op-managing-bodies',
  templateUrl: 'managing-bodies.component.html',
  styleUrls: ['managing-bodies.component.css'],
  directives: [ROUTER_DIRECTIVES, ManagingBodyListComponent],
})

@Routes([
  {
    path: '/:id',
    component: ManagingBodyDetailComponent
  },
])

export class ManagingBodiesComponent {

  constructor() {}

}
