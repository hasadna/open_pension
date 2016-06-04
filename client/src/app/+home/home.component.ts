import { Component } from '@angular/core';

import { ManagingBodiesComponent } from '../+managing-bodies/managing-bodies.component';

@Component({
  moduleId: module.id,
  selector: 'op-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ManagingBodiesComponent]
})

export class HomeComponent {

  constructor() {}

}
