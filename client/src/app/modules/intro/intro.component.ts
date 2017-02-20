import { Component, OnInit } from '@angular/core';
import * as introJs from 'intro.js';

@Component({
  selector: 'op-intro',
  template: `<p class="foo" data-intro="Hello step one!">foobar</p>`,
  styles: [``]
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    introJs().start();
  }

}
