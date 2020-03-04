import { MapsAPILoader } from "@agm/core";
import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import {  Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Driver } from "../models/driver";
import { Trip } from "../models/trip";
import * as TripActions from "../store/actions/trip.actions";
import DateTimeFormat = Intl.DateTimeFormat;
import * as fromDriver from "../store/reducers/driver.reducer";
import { AppState } from "../store/state/app.state";


@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["./create-trip.component.less"]
})
export class CreateTripComponent implements OnInit {
  startTime: DateTimeFormat;
  finishTime: DateTimeFormat;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  startX: number;
  finishX: number;
  startY: number;
  finishY: number;
  private geoCoder: google.maps.Geocoder;
  public startIconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  public finishIconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  currentDriver$: Observable<Driver>;
  currentDriver: Driver;

  @ViewChild("start", { static: false })
  public startElementRef: ElementRef;

  @ViewChild("finish", { static: false })
  public finishElementRef: ElementRef;
  selectedPassengersValue: number;
  constructor( private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
    this.currentDriver$.subscribe(currentDriver => {
      if (currentDriver) {
        this.currentDriver = currentDriver;
      }
    });
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
        });
      });
    });
  }
  private setCurrentLocation(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
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
  if (this.startX && this.startY && this.startTime && this.finishTime
     && this.finishY && this.finishX && this.selectedPassengersValue) {
    const newTrip = new Trip(null, this.startTime, this.finishTime,
      this.startX, this.startY, this.finishX, this.finishY, this.selectedPassengersValue, this.currentDriver, null );
    const payload = {
      trip: newTrip,
    };
    this.store.dispatch(TripActions.addTrip(payload));

  }
  }
}
