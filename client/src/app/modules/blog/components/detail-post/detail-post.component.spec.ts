import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostComponent } from './detail-post.component';

describe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
