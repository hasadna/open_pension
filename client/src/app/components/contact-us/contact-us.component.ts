import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'op-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  private contactName: string;
  private contactEmail: string;
  private content: string;
  constructor() { }

  ngOnInit() {
  }

  submitMe() {

  }

}
