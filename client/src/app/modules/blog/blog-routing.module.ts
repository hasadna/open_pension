import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: ':pageNumber', component: BlogComponent },
  { path: 'post/:postId', component: DetailPostComponent },
  { path: '**' , redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BlogRoutingModule {}
