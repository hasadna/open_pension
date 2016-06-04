import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManagingBodyComponent } from './managing-body/managing-body.component';
import { ManagingBody } from './shared/managing-body.model';
import { ManagingBodyService } from './shared/managing-body.service';

@Component({
  moduleId: module.id,
  selector: 'op-managing-bodies',
  templateUrl: 'managing-bodies.component.html',
  styleUrls: ['managing-bodies.component.css'],
  directives: [ManagingBodyComponent],
  providers: [ManagingBodyService]
})

export class ManagingBodiesComponent implements OnInit {
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
