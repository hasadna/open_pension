import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderSectionComponent} from "./header-section/header-section.component";
import {TRANSLATION_PROVIDERS} from "./translation/translation";
import {TranslatePipe} from "./translation/transplate.pipe";
import {TranslateService} from "./translation/trnanslate.service";
import {Store} from "./app.store";
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './search/search.component';
import {routing} from "./app.routes";
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent, TranslatePipe, LogoComponent, SearchComponent, AboutComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService, Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
