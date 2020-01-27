import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDriverComponent } from './signup-driver.component';

describe('SignupDriverComponent', () => {
  let component: SignupDriverComponent;
  let fixture: ComponentFixture<SignupDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
