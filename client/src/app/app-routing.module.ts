import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiComponent, HowItWorksComponent } from './components';


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
