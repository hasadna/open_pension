import { Component, OnInit } from '@angular/core';

import { CompaniesGridComponent } from './companies-grid';

@Component({
  moduleId: module.id,
  selector: 'op-companies',
  templateUrl: 'companies.component.html',
  styleUrls: ['companies.component.css'],
  directives: [CompaniesGridComponent]
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
