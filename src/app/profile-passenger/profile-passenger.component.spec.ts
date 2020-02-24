import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfilePassengerComponent } from "./profile-passenger.component";

describe("ProfilePassengerComponent", () => {
  let component: ProfilePassengerComponent;
  let fixture: ComponentFixture<ProfilePassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
