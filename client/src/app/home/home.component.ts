import {Component} from "@angular/core";
import {ManagingBodyListComponent} from "../managing-body-list/managing-body-list.component";

@Component({
  selector: 'op-home',
  templateUrl: 'app/home/home.component.html',
  directives: [ManagingBodyListComponent],
})

export class HomeComponent {

  constructor() { }
  
}
