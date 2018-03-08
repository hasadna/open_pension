import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reducers } from './reducers';
import { AppRoutingModule } from './app-routing.module';

import { OpComponent } from './op.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { PaiComponent } from './components/pai/pai.component';

import { PaiEffect } from './effects/pai.effect';
import { FiltersEffect } from './effects/filters.effect';
import { QuartersEffect } from './effects/quarters.effect';

import { PaiService } from './services/pai.service';
import { FiltersService } from './services/filters.service';
import { QuartersService } from './services/quarters.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    OpComponent,
    FiltersComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    PaiComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    DragulaModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      PaiEffect,
      FiltersEffect,
      QuartersEffect,
    ]),
  ],
  providers: [
    PaiService,
    FiltersService,
    QuartersService,
  ],
  bootstrap: [OpComponent]
})
export class AppModule { }
