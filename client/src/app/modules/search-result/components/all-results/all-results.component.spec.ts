import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';

import { AllResultsComponent } from './all-results.component';
import { reducers } from '../../../../reducers';


describe('AllResultsComponent', () => {
  let component: AllResultsComponent;
  let fixture: ComponentFixture<AllResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
      ],
      declarations: [ AllResultsComponent ],
      providers: [{ provide: Router, useValue: {}, }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
