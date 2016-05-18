import { Component, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { ManagingBody, ManagingBodyService } from '../managing-body/managing-body.service';

@Component({
  selector: 'op-managing-body-detail',
  templateUrl: 'app/components/managing-body-detail/managing-body-detail.component.html',
  styleUrls: [],
  providers: [],
  directives: [],
  pipes: []
})

export class ManagingBodyDetailComponent implements OnInit {
  @Input managingBody: ManagingBody;
  
  constructor(
    private routeParams: RouteParams,
    private managingBodyService: ManagingBodyService
  ) {}

  ngOnInit() {
    let id = +this.routeParams.get('id');
    this.managingBodyService.getManagingBody(id)
        .subscribe((managingBody: ManagingBody) => this.managingBody = managingBody);
  }

}
