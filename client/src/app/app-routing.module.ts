import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaiComponent } from './components/pai/pai.component';

const routes: Routes = [
  { path: '', redirectTo: 'pai', pathMatch: 'full' },
  { path: 'pai', component: PaiComponent },
  { path: 'about', loadChildren: 'app/modules/about/about.module#AboutModule' },
  { path: 'contact', loadChildren: 'app/modules/contact/contact.module#ContactModule' },
  { path: 'blog', loadChildren: 'app/modules/blog/blog.module#BlogModule' },
  { path: '**' , redirectTo: 'pai', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
