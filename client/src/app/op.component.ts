import { Component } from '@angular/core';

@Component({
	selector: 'op-root',
	template: `
		<op-header></op-header>
		<router-outlet></router-outlet>
		<op-footer></op-footer>
	`,
	styles: [``]
})
export class OpComponent {
}
