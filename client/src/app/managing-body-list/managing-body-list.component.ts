import { Component, OnInit, Output } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { ManagingBodyComponent } from '../managing-body/managing-body.component';

@Component({
  selector: 'op-managing-body-list',
  templateUrl: 'app/managing-body-list/managing-body-list.component.html',
  styleUrls: [],
  providers: [],
  directives: [ManagingBodyComponent],
  pipes: []
})

export class ManagingBodyListComponent implements OnInit {

  errorMessage: String;

  constructor(
  ) {}

  ngOnInit() {
    this.getManagingBodies();
  }

  getManagingBodies() {
    this.managingBodyList = this.getManagingBodies();
  }
}
