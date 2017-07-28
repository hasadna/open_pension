import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { DisqusModule } from 'ng2-awesome-disqus';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { ApolloModule } from 'apollo-angular';

import { BlogRoutingModule } from './blog-routing.module';
import { provideClient } from '../../client';

import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

import { PostEffects } from './effects/post';

import { PostService } from './services/post.service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BlogRoutingModule,
    MaterialModule,
    DisqusModule,
    ShareButtonsModule.forRoot(),
    EffectsModule.run(PostEffects),
    ApolloModule.forRoot(provideClient),
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
