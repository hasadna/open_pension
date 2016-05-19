import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Home } from './home/home.component';
import { About } from './about/about.component';
import { ManagingBodyDetailComponent } from './managing-body-detail/managing-body-detail.component';

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/app.html',
})

@RouteConfig([
  { path: '/home',       component: Home,        name: 'Home', useAsDefault: true },
  { path: '/about',      component: About,       name: 'About' },
  { path: '/managingbody/:id',   component: ManagingBodyDetailComponent,  name: 'ManagingBodyDetailComponent' },
])

export class App {
  constructor() { }
}
