import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DisqusModule } from "ng2-awesome-disqus";

import { BlogRoutingModule } from './blog-routing.module';

import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

import { reducer } from './reducers';

import { PostEffects } from './effects/post';

import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    DetailPostComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    BlogRoutingModule,
    MaterialModule,
    DisqusModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(PostEffects),
  ],
  providers: [
    PostService,
  ],
})
export class BlogModule { }
