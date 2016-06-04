import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { ManagingBodyDetailComponent } from './managing-body-detail/managing-body-detail.component';
import { ManagingBodyListComponent } from './managing-body-list/managing-body-list.component';

@Component({
  moduleId: module.id,
  selector: 'op-managing-bodies',
  templateUrl: 'managing-bodies.component.html',
  styleUrls: ['managing-bodies.component.css'],
  directives: [ManagingBodyListComponent],
})

@Routes([
  { path: '/', component: ManagingBodyDetailComponent }
  // { path: '/:id', component: ManagingBodyDetailComponent }
])

export class ManagingBodiesComponent {

  constructor() {}

}
