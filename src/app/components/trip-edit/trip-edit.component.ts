import { Component, EventEmitter, Input,  OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Trip } from "../../models/trip";
import * as TripActions from "../../store/actions/trip.actions";
import * as fromTrip from "../../store/reducers/trip.reducer";
import { CreateTripComponent } from "../create-trip/create-trip.component";

@Component({
  selector: "app-trip-edit",
  templateUrl: "./trip-edit.component.html",
  styleUrls: ["../create-trip.component.less"]
})
export class TripEditComponent extends CreateTripComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();
  @Input()  currentTripId: string;
  editTripForm: FormGroup;
  currentTrip$: Observable<Trip>;
  currentTrip: Trip;
  currentTripSubcription: Subscription;

  ngOnInit(): void {
    this.initForm();
    this.subscribeToDriverChanges();
    this.initGoogleApi(this.editTripForm);
    this.subscribeToTrip();
  }

  initForm(): void {
    this.editTripForm = this.fb.group({
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required]),
      startPlace: new FormControl("", [Validators.required]),
      finishPlace: new FormControl("", [Validators.required]),
      maxPassengersValue: new FormControl("", [Validators.required])});
  }
  subscribeToTrip(): void {

    this.store.dispatch(TripActions.loadTrip({id: this.currentTripId}));
    this.currentTrip$ = this.store.select(fromTrip.selectCurrentTrip);
    this.currentTripSubcription = this.currentTrip$.subscribe( trip => {
      if (trip) {
        this.currentTrip = trip;
        this.updateValues();
        this.startX = this.currentTrip.startX;
        this.startY = this.currentTrip.startY;
        this.finishX = this.currentTrip.finishX;
        this.finishY = this.currentTrip.finishY;
        this.cdr.detectChanges();

      }
    });
  }

  updateValues(): void {
    this.editTripForm.patchValue({
        startTime: this.convertTimeToString(this.currentTrip.startTime),
        finishTime: this.convertTimeToString(this.currentTrip.finishTime),
        startPlace: this.currentTrip.startPlace,
        finishPlace: this.currentTrip.finishPlace,
        maxPassengersValue: this.currentTrip.maxPassengers
      });
  }
  ngOnDestroy(): void {
    this.currentTripSubcription.unsubscribe();
  }
  submit(): void {
    if ( this.editTripForm.get("startTime").value.length === 5) {
      this.editTripForm.patchValue({startTime: this.convertTime(this.editTripForm.get("startTime").value)});
    }
    if ( this.editTripForm.get("finishTime").value.length === 5) {
      this.editTripForm.patchValue({finishTime: this.convertTime(this.editTripForm.get("finishTime").value)});
    }
    const newTrip = new Trip(
      this.currentTrip.id,
      this.editTripForm.get("startTime").value,
      this.editTripForm.get("finishTime").value,
      this.startX, this.startY,
      this.finishX, this.finishY,
      this.editTripForm.get("startPlace").value,
      this.editTripForm.get("finishPlace").value,
      this.editTripForm.get("maxPassengersValue").value,
      this.currentDriver.login,  this.currentTrip.passengersLogins);
    this.store.dispatch(TripActions.editTrip(newTrip));
    this.closeEvent.emit();
  }
  convertTimeToString(utcTime: string | Date): string {
  const dateTimeArray = utcTime.toString().split("T");
  const timeArray = dateTimeArray[1].split(":");
  const result = "";
  return result.concat(timeArray[0] + ":" + timeArray[1]);
}
}
