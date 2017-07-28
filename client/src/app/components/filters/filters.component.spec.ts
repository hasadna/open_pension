import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { reducer } from '../../reducers';
import { StoreModule } from '@ngrx/store';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragulaModule,
        StoreModule.provideStore(reducer),
      ],
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
