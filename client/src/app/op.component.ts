import { Component } from '@angular/core';

@Component({
  selector: 'op-root',
  template: `
    <h1>
      {{title}}
    </h1>
  `,
  styles: [``]
})
export class OpComponent {
  title = 'app works!';
}
