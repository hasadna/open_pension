import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IntroRoutingModule { }
