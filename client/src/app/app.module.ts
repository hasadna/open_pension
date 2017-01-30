import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { OpComponent } from './op.component';
import reducer from './reducers';

import {
  HeaderComponent,
  SearchComponent,
  FooterComponent,
  PaiComponent,
  FiltersComponent
} from './components';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

// import { ExampleActions } from './actions';

// import { ExapleEffects } from './effects';

// import { ExampleService } from './services';

@NgModule({
  declarations: [
    OpComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    PaiComponent,
    FiltersComponent,
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
export class AppModule { }
