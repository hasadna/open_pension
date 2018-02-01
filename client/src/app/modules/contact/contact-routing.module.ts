import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: '**' , redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ContactRoutingModule {}
