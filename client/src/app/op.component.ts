import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { HomeComponent } from './+home';
import { AboutComponent } from './+about';
import { ManagingBodiesComponent } from './+managing-bodies';
import { FeedbackComponent } from './feedback'

@Component({
  moduleId: module.id,
  selector: 'op-app',
  templateUrl: 'op.component.html',
  styleUrls: ['op.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS]
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
    path:'/feedback',
    component: FeedbackComponent
  },
  {
    path: '/managingBodies',
    component: ManagingBodiesComponent
  }
])

export class OpAppComponent {
  title = 'op works!';

}
