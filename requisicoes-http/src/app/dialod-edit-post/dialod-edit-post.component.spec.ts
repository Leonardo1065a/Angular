import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialodEditPostComponent } from './dialod-edit-post.component';

describe('DialodEditPostComponent', () => {
  let component: DialodEditPostComponent;
  let fixture: ComponentFixture<DialodEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialodEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialodEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
