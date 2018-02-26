import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DisqusModule } from 'ngx-disqus';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { reducers } from './reducers';
import { BlogRoutingModule } from './blog-routing.module';

import { PostComponent } from './components/post/post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { BlogComponent } from './components/blog/blog.component';

import { PostEffect } from './effects/post.effect';

import { PostService } from './services/post.service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    PostComponent,
    DetailPostComponent,
    BlogComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BlogRoutingModule,
    DisqusModule.forRoot('openpension'),
    ShareButtonsModule.forRoot(),
    MatButtonModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      PostEffect,
    ]),
  ],
  providers: [
    PostService,
  ],
})
export class BlogModule { }
