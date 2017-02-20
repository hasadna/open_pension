import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';

@NgModule({
  imports: [
    CommonModule,
    IntroRoutingModule
  ],
  declarations: [IntroComponent]
})
export class IntroModule { }
