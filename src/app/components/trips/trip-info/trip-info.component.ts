import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { TakeTripModel } from "../../../models/take-trip-model";
import { Trip } from "../../../models/trip";
import { UserModel } from "../../../models/user-model";
import * as TripActions from "../../../store/actions/trip.actions";
import * as fromTrip from "../../../store/reducers/trip.reducer";
import { BaseTripComponent } from "../base-trip/base-trip.component";


@Component({
  selector: "app-trip-info",
  templateUrl: "./trip-info.component.html",
  styleUrls: ["../trip.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripInfoComponent extends BaseTripComponent implements OnInit, OnDestroy {
  public finishElementRef: ElementRef;
  public startElementRef: ElementRef;
  editTripForm: FormGroup;
  currentTrip$: Observable<Trip>;
  currentTrip: Trip;
  currentTripSubcription: Subscription;
  @Output() closeEvent = new EventEmitter<void>();
  @Input()  currentTripId: string;
  @Input()  currentUser: UserModel;
  @ViewChild("start", { static: false}) set content(content: ElementRef) {
    if ( content) {
      this.startElementRef = content;
      if ( this.finishElementRef ) {
      this.initGoogleApi(this.editTripForm);
      }
    }
    }
  @ViewChild("finish", { static: false}) set content2(content: ElementRef) {
    if ( content) {
      this.finishElementRef = content;
      if ( this.startElementRef ) {
        this.initGoogleApi(this.editTripForm);
      }
    }
  }
  ngOnInit(): void {
    this.initForm();
    this.subscribeToDriverChanges();
    this.subscribeToTrip();
  }
  initForm(): void {
    this.editTripForm = this.fb.group({
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required]),
      startPlace: new FormControl("", [Validators.required]),
      finishPlace: new FormControl("", [Validators.required]),
      maxPassengersValue: new FormControl("", [Validators.required])});
    this.onChanges(this.editTripForm);
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
        if ( this.currentUser.login !== this.currentTrip.driverLogin ) {
          this.editTripForm.disable();
        } else {
          this.editTripForm.enable();
        }

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
    this.currentDriverSubscription.unsubscribe();
  }
  submit(): void {
    if ( this.editTripForm.invalid || !this.startX || !this.startY || !this.finishX || !this.finishY ) {
      this.errorMessage = true;
      this.cdr.markForCheck();
      return;
    }
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
  checkIfSeatIsAlreadyTaken(trip: Trip): boolean {
    return trip.passengersLogins.some((login: string) => login === this.currentUser.login) || trip.maxPassengers === 0;
  }
  takeTrip(trip: Trip): void {
    if (trip.passengersLogins.some((login: string) => login === this.currentUser.login)) {
      return;
    }
    const model = new TakeTripModel(this.currentUser.login, trip);
    this.store.dispatch(TripActions.takeTrip(model));
    this.closeEvent.emit();
  }
  delete(): void {
    this.store.dispatch(TripActions.deleteTrip({id: this.currentTrip.id}));
    this.closeEvent.emit();
  }
  closeModal(): void {
    this.store.dispatch(TripActions.dropCurrentTrip());
    this.closeEvent.emit();
  }
  checkIfStartInputIsValid(myForm: FormGroup): boolean {
    return (!this.startX || !this.startY) && myForm.get("startPlace").dirty;
  }
  checkIfFinishInputIsValid(myForm: FormGroup): boolean {
    return (!this.finishX || !this.finishY) && myForm.get("finishPlace").dirty;
  }
  disableButton(): boolean {
    if ( this.editTripForm.get("startPlace").dirty && this.editTripForm.get("finishPlace").dirty) {
      return this.editTripForm.invalid || !this.startX || !this.finishX && this.editTripForm.dirty;
    }
    if ( !this.editTripForm.get("startPlace").dirty && this.editTripForm.get("finishPlace").dirty) {
      return this.editTripForm.invalid ||  !this.finishX && this.editTripForm.dirty;
    }
    if ( this.editTripForm.get("startPlace").dirty && !this.editTripForm.get("finishPlace").dirty) {
      return this.editTripForm.invalid ||  !this.startX && this.editTripForm.dirty;
    }
    return this.editTripForm.invalid  && this.editTripForm.dirty;
  }
}
