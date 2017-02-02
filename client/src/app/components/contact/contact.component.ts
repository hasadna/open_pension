import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
          name: this.formBuilder.control(null),
          email: this.formBuilder.control(null),
          content: this.formBuilder.control(null),
      });
  }

  ngOnInit() {
  }

}
