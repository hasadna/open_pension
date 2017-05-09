import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':postId', component: DetailPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogRoutingModule { }
