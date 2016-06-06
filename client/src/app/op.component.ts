import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { TranslateService, TRANSLATE_PROVIDERS } from 'ng2-translate/ng2-translate';

import { HomeComponent } from './+home';
import { AboutComponent } from './+about';
import { ManagingBodiesComponent } from './+managing-bodies';

@Component({
  moduleId: module.id,
  selector: 'op-app',
  templateUrl: 'op.component.html',
  styleUrls: ['op.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, TRANSLATE_PROVIDERS]
})

@Routes([
  {
    path: '/home',
    component: HomeComponent,
    // useAsDefault: true coming soon
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/managingBodies',
    component: ManagingBodiesComponent
  }
])

export class OpAppComponent {
  title: string = 'op works!';

  constructor(public translate: TranslateService) {
      // use navigator lang if available
      var userLang = navigator.language.split('-')[0];
      userLang = /(he|en)/gi.test(userLang) ? userLang : 'he';

      console.log(userLang);
      // this trigger the use of the hebrew or english language after setting the translations.
      translate.use(userLang);
  }
}
