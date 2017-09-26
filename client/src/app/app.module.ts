import 'hammerjs';
import * as Raven from 'raven-js';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { reducers } from './reducers';

import { OpComponent } from './op.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { PaiComponent } from './components/pai/pai.component';
import { FiltersComponent } from './components/filters/filters.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

import { PaiEffects } from './effects/pai';
import { FiltersEffects } from './effects/filters';
import { QuartersEffects } from './effects/quarters';
import { ContactEffects } from './effects/contact';

import { PaiService } from './services/pai.service';
import { FiltersService } from './services/filters.service';
import { QuartersService } from './services/quarters.service';
import { ContactService } from './services/contact.service';

import { environment } from '../environments/environment';

// Raven
//   .config('https://2d4c5f09376d40ef8beef9b4b5444667@sentry.io/202882')
//   .install();
//
// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     Raven.captureException(err);
//   }
// }

@NgModule({
  declarations: [
    OpComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    PaiComponent,
    FiltersComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragulaModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      PaiEffects,
      FiltersEffects,
      QuartersEffects,
      ContactEffects,
    ]),
    FlexLayoutModule
  ],
  providers: [
    PaiService,
    FiltersService,
    QuartersService,
    ContactService,
    // { provide: ErrorHandler, useClass: RavenErrorHandler },
  ],
  bootstrap: [OpComponent]
})
export class AppModule { }
