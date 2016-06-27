import { Component, OnInit } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'op-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private name: string
    private email: string,
    private text: string) {}

  ngOnInit() {
  }

}
