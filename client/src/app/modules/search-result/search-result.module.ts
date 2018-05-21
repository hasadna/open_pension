import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResultsComponent } from './components/all-results/all-results.component';
import { SearchResultRoutingModule } from './search-result-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule
  ],
  declarations: [AllResultsComponent]
})
export class SearchResultModule { }
