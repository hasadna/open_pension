import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpComponent } from './op.component';
import { PaiComponent } from './components/pai/pai.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'pai', pathMatch: 'full' },
  { path: 'pai', component: PaiComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', loadChildren: 'app/modules/blog/blog.module#BlogModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
