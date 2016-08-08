import { Component } from '@angular/core';

import { HeaderComponent } from './shared/header';
import { SearchComponent } from './shared/search';
import { FooterComponent } from './shared/footer';

import { PiComponent } from './pi/pi.component';

@Component({
  moduleId: module.id,
  selector: 'op-root',
  templateUrl: 'op.component.html',
  styleUrls: ['op.component.css'],
  directives: [
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    PiComponent
  ]
})
export class OpComponent {}
