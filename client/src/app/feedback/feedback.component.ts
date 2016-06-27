import { Component, OnInit } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { NgForm }    from '@angular/common';
@Component({
  moduleId: module.id,
  selector: 'op-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
