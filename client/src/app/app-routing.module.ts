import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaiComponent } from './components/pai/pai.component';

const routes: Routes = [
  { path: '', redirectTo: 'pai', pathMatch: 'full' },
  { path: 'pai', component: PaiComponent },
  { path: 'detail-pai', loadChildren: 'app/modules/detail-pai/detail-pai.module#DetailPaiModule' },
  { path: 'about', loadChildren: 'app/modules/about/about.module#AboutModule' },
  { path: 'contact', loadChildren: 'app/modules/contact/contact.module#ContactModule' },
  { path: 'blog', loadChildren: 'app/modules/blog/blog.module#BlogModule' },
  { path: 'search-result', loadChildren: 'app/modules/search-result/search-result.module#SearchResultModule' },
  { path: '**' , redirectTo: 'pai', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
