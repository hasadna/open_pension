import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiComponent} from "./components/pai/pai.component";
import { HowItWorksComponent} from "./components/how-it-works/how-it-works.component";
import { AboutComponent} from "./components/about/about.component";
import { PostsComponent} from "./components/posts/posts.component";
import { PostComponent} from "./components/post/post.component";


const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
  { path: '', component: PaiComponent },
  { path: 'how-it-works', component: HowItWorksComponent},
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:id', component: PostComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
