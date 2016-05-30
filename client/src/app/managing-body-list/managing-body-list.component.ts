import { Component, OnInit, Output } from '@angular/core';
import {Observable} from '../../../node_modules/rxjs/Observable.d';

import { ManagingBodyComponent } from '../managing-body/managing-body.component.ts';
import { ManagingBody, ManagingBodyService } from '../managing-body/managing-body.service.ts';

@Component({
  selector: 'op-managing-body-list',
  templateUrl: 'app/managing-body-list/managing-body-list.component.html',
  styleUrls: [],
  providers: [ManagingBodyService],
  directives: [ManagingBodyComponent],
  pipes: []
})

export class ManagingBodyListComponent implements OnInit {
  managingBodyList: Observable<ManagingBody[]>;
  errorMessage: String;

  constructor(
    private managingBodyService: ManagingBodyService
  ) {}

  ngOnInit() {
    this.getManagingBodies();
  }

  getManagingBodies() {
    this.managingBodyList = this.managingBodyService.getManagingBodies();
  }
}
