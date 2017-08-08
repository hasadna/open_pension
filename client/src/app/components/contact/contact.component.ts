import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  nameControl;
  emailControl;
  contentControl;
  NameError = false;
  EmailError = false;
  ContentError = false;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      // tslint:disable-next-line
      email: this.formBuilder.control(null, [Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), Validators.required]),
      content: this.formBuilder.control(null, Validators.required),
    });

    this.nameControl = this.contactForm.get('name');
    this.emailControl = this.contactForm.get('email');
    this.contentControl = this.contactForm.get('content');
  }

  checkError(event) {
    // Check if the pressed key is tab, if so we dont want to run validation.
    if (event.keyCode === 9) {
      return;
    }

    const elementName = event.target.getAttribute('formcontrolname');
    switch (elementName) {
      case 'name': {
        this.NameError = true;
        break;
      }
      case 'email': {
        this.EmailError = true;
        break;
      }
      case 'content': {
        this.ContentError = true;
        break;
      }
    }
  }

  onSubmit() {
    const formModel = this.contactForm.value;
  }
}
