import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { SendNewContactAction } from '../../actions/contact.actions';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  formSubmited = false;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      'email': new FormControl('', [
        // tslint:disable-next-line
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
        Validators.required
      ]),
      'content': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get content() {
    return this.contactForm.get('content');
  }

  onSubmit() {
    const formModel = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      content: this.contactForm.value.content,
    } as Contact;
    this.store.dispatch(new SendNewContactAction(formModel));

    this.formSubmited = true;
    this.contactForm.reset();

    setTimeout(() => {
      this.formSubmited = false;
    }, 5000);
  }
}
