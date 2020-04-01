import { MapsAPILoader } from "@agm/core";
import {
  AfterViewInit,
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
import { Observable, Subscription } from "rxjs";
import { Driver } from "../../models/driver";
import { Trip } from "../../models/trip";
import * as TripActions from "../../store/actions/trip.actions";
import DateTimeFormat = Intl.DateTimeFormat;
import * as fromDriver from "../../store/reducers/driver.reducer";
import { AppState } from "../../store/state/app.state";



@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["../create-trip.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTripComponent implements OnInit, OnDestroy, AfterViewInit {
  createTripForm: FormGroup;
  startTime: DateTimeFormat;
  finishTime: DateTimeFormat;
  startPlace: string;
  finishPlace: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  startX: number;
  finishX: number;
  startY: number;
  finishY: number;
  currentDriver$: Observable<Driver>;
  currentDriverSubscription: Subscription;
  currentDriver: Driver;


  private geoCoder: google.maps.Geocoder;
  public startIconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  public finishIconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
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
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToDriverChanges();
    this.initGoogleApi(this.createTripForm);
  }

  subscribeToDriverChanges(): void {
    this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
    this.currentDriverSubscription = this.currentDriver$.subscribe(currentDriver => {
      if (currentDriver) {
        this.currentDriver = currentDriver;
      }
    });
  }
  initGoogleApi(createTripForm: FormGroup): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      const autocompleteStart = new google.maps.places.Autocomplete(this.startElementRef.nativeElement, {
        types: ["address"]
      });

      const autocompleteFinish = new google.maps.places.Autocomplete(this.finishElementRef.nativeElement, {
        types: ["address"]
      });
      autocompleteStart.addListener("place_changed", () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autocompleteStart.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.startX = place.geometry.location.lat();
          this.startY = place.geometry.location.lng();
          this.zoom = 12;
          this.geoCoder.geocode({"location": {lat: this.startX, lng: this.startY}}, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                this.zoom = 12;
                createTripForm.patchValue({
                  "startPlace": results[0].formatted_address
                });
              }
            }
          });
        });
      });
      autocompleteFinish.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteFinish.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.finishX = place.geometry.location.lat();
          this.finishY = place.geometry.location.lng();
          this.zoom = 12;
          this.geoCoder.geocode({"location": {lat: this.finishX, lng: this.finishY}}, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                this.zoom = 12;
                createTripForm.patchValue({
                  "finishPlace": results[0].formatted_address
                });
              }
            }
          });
        });
      });
    });
  }
  initForm(): void {
    this.createTripForm = this.fb.group({
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required]),
      startPlace: new FormControl("", [Validators.required]),
      finishPlace: new FormControl("", [Validators.required]),
      maxPassengersValue: new FormControl("", [Validators.required])});
  }
  private setCurrentLocation(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        this.cdr.detectChanges();
      });
    }
  }
  getAddress(latitude: number, longitude: number): void {
    this.geoCoder.geocode({ "location": { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === "OK") {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  submit(): void {
    const startTime = this.createTripForm.get("startTime").value.split(":");
    const finishTime = this.createTripForm.get("finishTime").value.split(":");
    const startH = Number(startTime[0]);
    const startM = Number(startTime[1]);
    const finishH = Number(finishTime[0]);
    const finishM = Number(finishTime[1]);
    const newTrip = new Trip(
      null,
      new Date(Date.UTC(null, null, null, startH, startM)).toISOString(),
      new Date(Date.UTC(null, null, null, finishH, finishM)).toISOString(),
       this.startX, this.startY,
       this.finishX, this.finishY,
       this.createTripForm.get("startPlace").value,
       this.createTripForm.get("finishPlace").value,
       this.createTripForm.get("maxPassengersValue").value,
       this.currentDriver.login,  []);
       this.store.dispatch(TripActions.addTrip(newTrip));
       this.router.navigate(["trips"]);

  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.currentDriverSubscription.unsubscribe();
    this.cdr.detach();
  }

}
