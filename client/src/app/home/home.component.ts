import { Component } from '@angular/core';

import { ManagingBodyListComponent } from '../components/managing-body-list/managing-body-list.component';
import { MainChartComponent } from '../components/main-chart/main-chart.component';

@Component({
  selector: 'op-home',
  templateUrl: 'app/home/home.component.html',
  styleUrls: [],
  providers: [],
  directives: [ManagingBodyListComponent, MainChartComponent],
  pipes: []
})

export class HomeComponent {

  constructor() { }
  
}
