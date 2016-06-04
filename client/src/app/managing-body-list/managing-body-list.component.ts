import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManagingBodyComponent } from '../managing-body/managing-body.component';
import { ManagingBody, ManagingBodyService } from '../managing-body/managing-body.service';

@Component({
  selector: 'op-managing-body-list',
  templateUrl: 'app/managing-body-list/managing-body-list.component.html',
  directives: [ManagingBodyComponent],
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