import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CompanyItemComponent } from '../company-item';
import { CompaniesService } from '../shared/companies.service';
import { Company } from '../shared/company.model';

@Component({
  moduleId: module.id,
  selector: 'op-companies-grid',
  templateUrl: 'companies-grid.component.html',
  styleUrls: ['companies-grid.component.css'],
  directives: [CompanyItemComponent],
  providers: [CompaniesService]
})
export class CompaniesGridComponent implements OnInit {
  companies: Observable<Company[]>;

  constructor(
    private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companies = this.companiesService.getCompanies();
  }

}
