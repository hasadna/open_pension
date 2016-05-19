import { Component } from '@angular/core';

import { ManagingBodyListComponent } from '../managing-body-list/managing-body-list.component';

@Component({
  selector: 'op-home',
  templateUrl: 'app/home/home.component.html',
  styleUrls: [],
  providers: [],
  directives: [ManagingBodyListComponent],
  pipes: []
})

export class HomeComponent {

  constructor() { }
  
}
