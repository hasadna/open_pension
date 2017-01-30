import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaiComponent} from "./components/pai/pai.component";
import {HowItWorksComponent} from "./components/how-it-works/how-it-works.component";


const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
  { path: '', component: PaiComponent },
  {path: 'how-it-works', component: HowItWorksComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
