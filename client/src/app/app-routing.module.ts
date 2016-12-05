import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaiComponent, ContactUsComponent } from './components';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
  { path: '', component: PaiComponent },
  { path: 'contact-us', component: ContactUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
