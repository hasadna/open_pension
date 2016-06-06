import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

import { ManagingBodiesComponent } from '../+managing-bodies/managing-bodies.component';

@Component({
  moduleId: module.id,
  selector: 'op-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  pipes: [TranslatePipe],
  directives: [ManagingBodiesComponent]
})

export class HomeComponent {

  constructor(public translate: TranslateService) {}

}
