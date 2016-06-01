import { Component } from '@angular/core';

import { ManagingBodyListComponent } from '../managing-body-list/managing-body-list.component';

@Component({
  moduleId: module.id,
  selector: 'op-home',
  templateUrl: 'home.component.html',
  directives: [ManagingBodyListComponent],
})

export class HomeComponent {

  constructor() { }

}
