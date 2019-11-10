import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllResultsComponent } from './components/all-results/all-results.component';

const routes: Routes = [
  { path: '', component: AllResultsComponent },
  { path: '**' , redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SearchResultRoutingModule {}
