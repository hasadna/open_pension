import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { reducer } from './reducers';

import { OpComponent } from './op.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { PaiComponent } from './components/pai/pai.component';
import { FiltersComponent } from './components/filters/filters.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

import { PaiEffects } from './effects/pai';

import { PaiService } from './services/pai.service';

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
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(PaiEffects),
  ],
  providers: [
    PaiService,
  ],
  bootstrap: [OpComponent]
})
export class AppModule { }
