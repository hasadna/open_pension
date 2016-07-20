import { Component, ViewChild } from '@angular/core';

import { DialogAnchorDirective } from './dialog.directive';
import { DialogComponent } from './dialog.component';   

@Component({
  moduleId: module.id,
  selector: 'op-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css'],
  directives: [DialogComponent, DialogAnchorDirective]
})

export class FeedbackComponent {
@ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;
  constructor() {}


    openDialogBox() {
        this.dialogAnchor.createDialog(DialogComponent);
    }

    
}
