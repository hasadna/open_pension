import { Component, OnInit } from '@angular/core';

declare var introJs;

@Component({
  selector: 'op-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    introJs().start();
  }

}
