import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fromRoot from '../../reducers';
import * as contactAction from '../../actions/contact';
import { Contact } from '../../models/contact';

@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  nameControl;
  emailControl;
  contentControl;
  NameError = false;
  EmailError = false;
  ContentError = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
  ) {
    this.contactForm = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      // tslint:disable-next-line
      email: this.formBuilder.control(null, [Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), Validators.required]),
      content: this.formBuilder.control(null, Validators.required),
    });

    this.nameControl = this.contactForm.get('name');
    this.emailControl = this.contactForm.get('email');
    this.contentControl = this.contactForm.get('content');

    this.store.select(fromRoot.getContactState).subscribe(
      res => {
        this.contactForm.reset();
        this.NameError = false;
        this.EmailError = false;
        this.ContentError = false;
        this.nameControl.setValue(res.name);
        this.emailControl.setValue(res.email);
        this.contentControl.setValue(res.content);
      }
    );
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
    const formModel = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      content: this.contactForm.value.content,
    } as Contact;
    this.store.dispatch(new contactAction.SendNewContactAction(formModel));
  }
}
