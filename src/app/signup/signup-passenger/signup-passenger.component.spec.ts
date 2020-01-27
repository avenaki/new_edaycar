import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPassengerComponent } from './signup-passenger.component';

describe('SignupPassengerComponent', () => {
  let component: SignupPassengerComponent;
  let fixture: ComponentFixture<SignupPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
