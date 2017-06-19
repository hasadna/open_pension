/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ContactComponent ],
      // providers: [ FormBuilder ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should display "contact" message in subheading', () => {
    de = fixture.debugElement.query(By.css('h4'));
    el = de.nativeElement;
    expect(el.textContent).toContain('יצירת קשר');
    expect(component).toBeTruthy();
  });

  it('it should display "description" message in paragraph', () => {
    de = fixture.debugElement.query(By.css('p'));
    el = de.nativeElement;
    expect(el.textContent).toContain('מוזמנים');
    expect(component).toBeTruthy();
  });
});
