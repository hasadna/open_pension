import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ManagingBodyDetailComponent } from './managing-body-detail/managing-body-detail.component';

import { ManagingBodyService } from './managing-body/managing-body.service';

@Component({
  moduleId: module.id,
  selector: 'op-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [ManagingBodyService],
  templateUrl: 'app.component.html',
})

@Routes([
  { path: '*',                   component: HomeComponent,                },
  { path: '/home',               component: HomeComponent,                },
  { path: '/about',              component: AboutComponent,               },
  { path: '/managingbody/:id',   component: ManagingBodyDetailComponent,  },
])

export class AppComponent {
  title = 'open-pension works!';

  constructor() {}

}
