import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: any;

  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'content': ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.dirty && this.contactForm.valid) {
      alert(`Name: ${this.contactForm.value.name} Email: ${this.contactForm.value.email}`);
    }
  }
}
