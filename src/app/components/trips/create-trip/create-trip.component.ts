import { MapsAPILoader } from "@agm/core";
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {  Store } from "@ngrx/store";
import { Trip } from "../../../models/trip";
import * as TripActions from "../../../store/actions/trip.actions";
import { AppState } from "../../../store/state/app.state";
import { BaseTripComponent } from "../base-trip/base-trip.component";




@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["../trip.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTripComponent extends BaseTripComponent implements OnInit, OnDestroy, AfterContentInit {
  createTripForm: FormGroup;
  @ViewChild("start", { static: false })
  public startElementRef: ElementRef;
  @ViewChild("finish", { static: false })
  public finishElementRef: ElementRef;

  constructor( protected mapsAPILoader: MapsAPILoader,
               protected ngZone: NgZone,
               protected store: Store<AppState>,
               protected fb: FormBuilder,
               protected cdr: ChangeDetectorRef,
               protected router: Router) {
    super(mapsAPILoader, ngZone, store, fb, cdr, router);
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToDriverChanges();
  }
  ngAfterContentInit(): void {
    this.initGoogleApi(this.createTripForm);
  }
  initForm(): void {
    this.createTripForm = this.fb.group({
      startTime: new FormControl( "", [Validators.required]),
      finishTime: new FormControl( "", [Validators.required]),
      startPlace: new FormControl("", [Validators.required]),
      finishPlace: new FormControl("", [Validators.required]),
      maxPassengersValue: new FormControl("", [Validators.required])});
    this.onChanges(this.createTripForm);
  }
  submit(): void {
    if ( this.createTripForm.invalid || !this.startX || !this.startY || !this.finishX || !this.finishY ) {
      this.errorMessage = true;
      this.cdr.markForCheck();
      return;
    }
    const startTime = this.convertTime( this.createTripForm.get("startTime").value);
    const finishTime = this.convertTime(this.createTripForm.get("finishTime").value);
    const newTrip = new Trip(
      null,
      startTime,
      finishTime,
       this.startX, this.startY,
       this.finishX, this.finishY,
       this.createTripForm.get("startPlace").value,
       this.createTripForm.get("finishPlace").value,
       this.createTripForm.get("maxPassengersValue").value,
       this.currentDriver.login,  []);
       this.store.dispatch(TripActions.addTrip(newTrip));
       this.router.navigate(["trips"]);

  }
  ngOnDestroy(): void {
    this.currentDriverSubscription.unsubscribe();
    this.cdr.detach();
  }
  checkIfStartInputIsValid(myForm: FormGroup): boolean {
    return (!this.startX || !this.startY) && myForm.get("startPlace").touched;
  }
  checkIfFinishInputIsValid(myForm: FormGroup): boolean {
    return (!this.finishX || !this.finishY) && myForm.get("finishPlace").touched;
  }
}


