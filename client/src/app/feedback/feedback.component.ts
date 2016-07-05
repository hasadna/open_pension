import { Component } from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'op-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})

export class FeedbackComponent {
  private feedbackModal: any;
  public feedbackModalIsVisible: boolean;


  constructor(
  ) {}

  feedbackModalClicked() {

  }

  showModal()
  {
    this.feedbackModalIsVisible = true;
  }

  hideModal()
  {
    this.feedbackModalIsVisible = false;
  }

}
