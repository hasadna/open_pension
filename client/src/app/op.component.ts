import { Component } from '@angular/core';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { ManagingBodyComponent } from './+managing-body';
import { HomeComponent } from './+home';
import { AboutComponent } from './+about';
import { ManagingBodiesComponent } from './+managing-bodies';

@Component({
  moduleId: module.id,
  selector: 'op-app',
  templateUrl: 'op.component.html',
  styleUrls: ['op.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})

@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/about', component: AboutComponent},
  {path: '/managing-bodies', component: ManagingBodiesComponent}
])

export class OpAppComponent {
  title = 'op works!';
}
