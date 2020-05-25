import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormValidationsComponent } from './reactive-form-validations.component';

describe('ReactiveFormValidationsComponent', () => {
  let component: ReactiveFormValidationsComponent;
  let fixture: ComponentFixture<ReactiveFormValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveFormValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
