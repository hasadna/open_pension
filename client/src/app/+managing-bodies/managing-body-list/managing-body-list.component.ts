import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManagingBodyComponent } from '../managing-body/managing-body.component';
import { ManagingBody } from '../shared/managing-body.model';
import { ManagingBodyService } from '../shared/managing-body.service';

@Component({
  moduleId: module.id,
  selector: 'op-managing-body-list',
  templateUrl: 'managing-body-list.component.html',
  styleUrls: ['managing-body-list.component.css'],
  directives: [ManagingBodyComponent],
  providers: [ManagingBodyService]
})

export class ManagingBodyListComponent implements OnInit {
  managingBodies: Observable<ManagingBody[]>;
  errorMessage: String;

  constructor(
    private managingBodyService: ManagingBodyService
  ) {}

  ngOnInit() {
    this.getManagingBodies();
  }

  getManagingBodies() {
    this.managingBodies = this.managingBodyService.getManagingBodies();
  }
}
