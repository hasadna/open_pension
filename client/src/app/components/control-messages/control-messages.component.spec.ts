import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ControlMessagesComponent } from './control-messages.component';

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlMessagesComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(inject([ FormBuilder ],
    (_formBuilder) => {
      fixture = TestBed.createComponent(ControlMessagesComponent);
      component = fixture.componentInstance;
      const contactForm = _formBuilder.group({
        'name': ['']
      });
      component.control = contactForm.controls.name;
      fixture.detectChanges();
    }
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
