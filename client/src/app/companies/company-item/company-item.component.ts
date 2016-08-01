import { Component, Input } from '@angular/core';

import { Company } from '../shared/company.model';

@Component({
  moduleId: module.id,
  selector: 'op-company-item',
  templateUrl: 'company-item.component.html',
  styleUrls: ['company-item.component.css']
})
export class CompanyItemComponent {
  @Input() company: Company;

  constructor() { }

}
