import { Component } from '@angular/core';

import { ManagingBodyComponent } from '../managing-body/managing-body.component';

@Component({
  selector: 'op-home',
  templateUrl: 'app/home/home.component.html',
  styleUrls: [],
  providers: [],
  directives: [ManagingBodyComponent],
  pipes: []
})

export class HomeComponent {

  constructor() { }
  
}
