import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppRoutingModule} from './app-routing.module';
import {OpComponent} from './op.component';
import reducer from './reducers';
import {HowItWorksComponent} from './components/how-it-works/how-it-works.component';
import {HeaderComponent} from "./components/header/header.component";
import {SearchComponent} from "./components/search/search.component";
import {FooterComponent} from "./components/footer/footer.component";
import {PaiComponent} from "./components/pai/pai.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {AboutComponent} from "./components/about/about.component";
import {PostComponent} from "./components/post/post.component";
import {PostsComponent} from "./components/posts/posts.component";

@NgModule({
  declarations: [
    OpComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    PaiComponent,
    PostComponent,
    PostsComponent,
    FiltersComponent,
    AboutComponent,
    HowItWorksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // EffectsModule.run(ExampleEffects),
  ],
  providers: [],
  bootstrap: [OpComponent]
})
export class AppModule {
}
