import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: ':pageNumber', component: BlogComponent },
  { path: 'post/:postId', component: DetailPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogRoutingModule { }
