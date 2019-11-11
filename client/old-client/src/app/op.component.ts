import { Component } from '@angular/core';

@Component({
  selector: 'op-root',
  template: `
    <op-header></op-header>
    <div id="app-wrapper">
      <router-outlet></router-outlet>
    </div>
    <op-footer></op-footer>
  `,
  styles: [`
    #app-wrapper {
      width: 80%;
      margin: auto;
      min-height: calc(100vh - (43px + 120px + 22px));
    }
  `],
})
export class OpComponent {
}
