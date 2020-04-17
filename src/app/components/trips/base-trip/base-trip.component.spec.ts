import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BaseTripComponent } from "./base-trip.component";

describe("BaseTripComponent", () => {
  let component: BaseTripComponent;
  let fixture: ComponentFixture<BaseTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
