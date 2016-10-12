import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
/**
 * Created by ranwahle on 12/10/2016.
 */
const appRoutes: Routes = [{path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}];

export const appRoutingProviders: any[] = [



];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


export class RoutesPaths {
  public paths: string[];

  constructor() {
    this.paths = appRoutes.map(route => route.path);
  }
}
