import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaiComponent } from './components';
import { AboutComponent } from './components';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
  { path: '', component: PaiComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
