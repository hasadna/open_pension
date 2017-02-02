import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'op-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
      this.buildForm();
  }


  buildForm() {
      this.contactForm = this.formBuilder.group({
          name: this.formBuilder.control(null, Validators.required),
          email: this.formBuilder.control(null, Validators.required),
          content: this.formBuilder.control(null, Validators.required),
      });
  }

  ngOnInit() {
  }

}
