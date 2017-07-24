import { Component } from '@angular/core';

declare const introJs: any;

@Component({
  selector: 'op-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { this.intro() }

  intro() {
    console.log('a');
    var intro = introJs();
    intro.setOptions({
      nextLabel : "המשך >>",
      prevLabel : "",
      skipLabel : "",
      doneLabel : "סגור",
      steps : [
        {
          intro: "Hello world!"
        },
        {
          element: document.querySelector('.filters-button.button-lightblue'),
          intro: "This is a tooltip.",
          position: "left"
        },
        {
          element: document.querySelectorAll('#step2')[0],
          intro: "Ok, wasn't that fun?",
          position: 'right'
        },
        {
          element: '#step3',
          intro: 'More features, more fun.',
          position: 'left'
        },
        {
          element: '#step4',
          intro: "Another step.",
          position: 'bottom'
        },
        {
          element: '#step5',
          intro: 'Get it, use it.'
        }
      ]
    });
    introJs().setOptions('nextLabel', 'foo');
    introJs().start();
  }
}
