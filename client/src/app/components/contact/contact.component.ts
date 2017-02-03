import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  displayErrs: boolean = false;


  constructor(private formBuilder: FormBuilder) {
      this.buildForm();
  }

  checkAll(){
      if(!this.contactForm.valid) {
          this.displayErrs = true;
      }
  }
  buildForm() {
      this.contactForm = this.formBuilder.group({
          name: this.formBuilder.control(null, [Validators.minLength(2),
                                                Validators.required]),
          email: this.formBuilder.control(null, [Validators.pattern(/\S+@\S+\.\S+/),
                                                Validators.required]),
          content: this.formBuilder.control(null, Validators.required),
      });
      this.nameControl = this.contactForm.get('name');
      this.emailControl = this.contactForm.get('email');
      this.contentControl = this.contactForm.get('content');
  }

  ngOnInit() {
  }

}
