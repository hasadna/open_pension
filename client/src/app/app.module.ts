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

@NgModule({
  declarations: [
    AppComponent,
    HeaderSectionComponent, TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService, Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
