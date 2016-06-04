import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ManagingBodyComponent} from "./managing-body/managing-body.component";
import {ManagingBodyService} from "./managing-body/managing-body.service";

@Component({
  selector: 'op-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [ManagingBodyService],
  templateUrl: 'app/app.html',
})

@RouteConfig([
  { path: '/home',               component: HomeComponent,                name: 'Home', useAsDefault: true },
  { path: '/about',              component: AboutComponent,               name: 'About' },
  { path: '/managingbody/...',   component: ManagingBodyComponent,  name: 'ManagingBodyComponent' },
])

export class App {

  constructor() {}

}
