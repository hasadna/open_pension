import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpComponent } from './op.component';
import { PaiComponent } from './components/pai/pai.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'pai', pathMatch: 'full' },
  { path: 'pai', component: PaiComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', loadChildren: 'app/modules/blog/blog.module#BlogModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
