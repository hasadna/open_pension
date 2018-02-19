import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailPaiRoutingModule } from './detail-pai-routing.module';

import { DetailPaiComponent } from './components/detail-pai/detail-pai.component';

@NgModule({
  declarations: [
    DetailPaiComponent,
  ],
  imports: [
    CommonModule,
    DetailPaiRoutingModule,
  ],
})
export class DetailPaiModule { }
