import { Component } from '@angular/core';

declare const introJs: any;

@Component({
  selector: 'op-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  intro() {
    introJs().start();
  }
}
