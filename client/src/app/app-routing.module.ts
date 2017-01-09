import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaiComponent } from './components/pai/pai.component';
import { AboutComponent } from './components/about/about.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
  { path: '', component: PaiComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:id', component: PostComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
