import { Component, OnInit } from '@angular/core';

import { CompanyItemComponent } from '../company-item';

@Component({
  moduleId: module.id,
  selector: 'op-companies-grid',
  templateUrl: 'companies-grid.component.html',
  styleUrls: ['companies-grid.component.css'],
  directives: [CompanyItemComponent]
})
export class CompaniesGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
