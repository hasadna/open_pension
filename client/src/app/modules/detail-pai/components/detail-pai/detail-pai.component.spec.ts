import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaiComponent } from './detail-pai.component';

describe('DetailPaiComponent', () => {
  let component: DetailPaiComponent;
  let fixture: ComponentFixture<DetailPaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
