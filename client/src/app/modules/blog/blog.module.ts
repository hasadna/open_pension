import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DisqusModule } from 'ngx-disqus';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { BlogRoutingModule } from './blog-routing.module';
import { reducers, metaReducers } from './reducers';

import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

import { PostEffects } from './effects/post';

import { PostService } from './services/post.service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BlogRoutingModule,
    MaterialModule,
    DisqusModule.forRoot('openpension'),
    ShareButtonsModule.forRoot(),
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      PostEffects,
    ])
  ],
  declarations: [
    BlogComponent,
    PostComponent,
    DetailPostComponent,
    SafeHtmlPipe,
  ],
  providers: [
    PostService,
  ],
})
export class BlogModule { }
