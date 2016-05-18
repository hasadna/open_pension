import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ManagingBodyComponent } from './managing-body/managing-body.component';

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/app.html',
})

@RouteConfig([
  { path: '/home',                component: HomeComponent,          name: 'Home', useAsDefault: true },
  { path: '/about',               component: AboutComponent,         name: 'About' },
  { path: '/managingbody{:id}',   component: ManagingBodyComponent,  name: 'ManagingBody' },
])

export class App {

  constructor() {}

}
