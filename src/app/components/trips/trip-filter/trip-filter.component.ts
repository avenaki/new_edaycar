import { AfterContentInit, Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { TripSearchFilter } from "../../../models/trip-search-filter";
import * as TripActions from "../../../store/actions/trip.actions";
import { BaseTripComponent } from "../base-trip/base-trip.component";


@Component({
  selector: "app-trip-filter",
  templateUrl: "./trip-filter.component.html",
  styleUrls: ["../trip.component.less"]
})
export class TripFilterComponent extends BaseTripComponent implements OnInit, AfterContentInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();
  filterForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.subscribeToDriverChanges();
    this.onChanges(this.filterForm);
  }
  ngAfterContentInit(): void {
    this.initGoogleApi(this.filterForm);
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required]),
      startPlace: new FormControl("", [Validators.required]),
      finishPlace: new FormControl("", [Validators.required]),
      canWalkDistance: new FormControl("", [Validators.required])});
  }

    submit(): void {
    const filter = new TripSearchFilter(
      this.filterForm.get("startTime").value,
      this.filterForm.get("finishTime").value,
      this.startX, this.startY,
      this.finishX, this.finishY,
      this.filterForm.get("canWalkDistance").value, );
      this.store.dispatch(TripActions.filterTrips(filter));
      this.closeEvent.emit();
 }
 ngOnDestroy(): void {
    this.formFinishPlaceSubscription.unsubscribe();
    this.formStartPlaceSubscription.unsubscribe();
 }

  checkIfStartInputIsValid(myForm: FormGroup): boolean {
    return (!this.startX || !this.startY) && myForm.get("startPlace").dirty;
  }

  checkIfFinishInputIsValid(myForm: FormGroup): boolean {
    return (!this.finishX || !this.finishY) && myForm.get("finishPlace").dirty;
  }
}
