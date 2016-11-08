import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Temp.
import { LayoutModule } from 'ng2-flex-layout';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LayoutModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    MaterialModule.forRoot(),
    // EffectsModule.run(ExampleEffects),
  ],
  providers: [],
  bootstrap: [OpComponent]
})
export class AppModule { }
