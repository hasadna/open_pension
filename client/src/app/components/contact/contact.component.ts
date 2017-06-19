import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  nameControl;
  emailControl;
  contentControl;
  displayErrs = false;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.minLength(2), Validators.required]),
      email: this.formBuilder.control(null, [Validators.pattern(/\S+@\S+\.\S+/), Validators.required]),
      content: this.formBuilder.control(null, Validators.required),
    });

    this.nameControl = this.contactForm.get('name');
    this.emailControl = this.contactForm.get('email');
    this.contentControl = this.contactForm.get('content');
  }

  checkAll() {
    console.log('this.contactForm.valid', this.contactForm.valid);
    if(!this.contactForm.valid) {
      this.displayErrs = true;
    }
  }

  onSubmit() {
    const formModel = this.contactForm.value;
    console.log('save', formModel);
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.contactForm.setValue({
      name: '',
      email: '',
      content: ''
    });
  }
}
