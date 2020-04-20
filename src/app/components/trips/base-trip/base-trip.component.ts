import DateTimeFormat = Intl.DateTimeFormat;
import { MapsAPILoader } from "@agm/core";
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Driver } from "../../../models/driver";
import * as fromDriver from "../../../store/reducers/driver.reducer";
import { AppState } from "../../../store/state/app.state";

@Component({
  selector: "app-base-trip",
  template: "",
  styleUrls: ["./base-trip.component.less"]
})
export class BaseTripComponent {
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
  formStartPlaceSubscription: Subscription;
  formFinishPlaceSubscription: Subscription;
  currentDriver: Driver;
  origin:   google.maps.LatLng;
  destination: google.maps.LatLng;
  autocompleteStartIsUsed = false;
  autocompleteFinishIsUsed = false;
  errorMessage = false;
  protected geoCoder: google.maps.Geocoder;
  public startIconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  public finishIconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  @ViewChild("start", { static: false })
  public startElementRef: ElementRef;

  @ViewChild("finish", { static: false })
  public finishElementRef: ElementRef;
  addMarker(lat: number, lng: number): void {
    console.log(lat, lng);
  }
  constructor( protected mapsAPILoader: MapsAPILoader,
               protected ngZone: NgZone,
               protected store: Store<AppState>,
               protected fb: FormBuilder,
               protected cdr: ChangeDetectorRef,
               protected router: Router) {
  }
  convertTime(tripTime: string): string {
    const currentTime = tripTime.split(":");
    const timeHours = Number(currentTime[0]);
    const timeMinutes = Number(currentTime[1]);
    return  new Date(Date.UTC(null, null, null, timeHours, timeMinutes)).toISOString();
  }
  onChanges(myForm: FormGroup): void {
    this.formStartPlaceSubscription = myForm.get("startPlace").valueChanges.subscribe(() => {
      if ( !this.autocompleteStartIsUsed) {
        this.startX = undefined;
        this.startY = undefined;
      }
      this.autocompleteStartIsUsed = false;
    });
    this.formFinishPlaceSubscription = myForm.get("finishPlace").valueChanges.subscribe(() => {
      if ( !this.autocompleteFinishIsUsed) {
        this.finishX = undefined;
        this.finishY = undefined;
      }
      this.autocompleteFinishIsUsed = false;
    });
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
          if (place.geometry === undefined || place.geometry === null ||  !place.geometry) {
            return;
          }
          this.startX = place.geometry.location.lat();
          this.startY = place.geometry.location.lng();
          this.origin =  new google.maps.LatLng(this.startX, this.startY);
          this.autocompleteStartIsUsed = true;
          this.cdr.markForCheck();
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
          if (place.geometry === undefined || place.geometry === null ||
            !place.geometry) {
            return;
          }
          this.finishX = place.geometry.location.lat();
          this.finishY = place.geometry.location.lng();
          this.autocompleteFinishIsUsed = true;
          this.cdr.markForCheck();
          this.destination = new google.maps.LatLng(this.finishX, this.finishY);
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
  subscribeToDriverChanges(): void {
    this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
    this.currentDriverSubscription = this.currentDriver$.subscribe(currentDriver => {
      if (currentDriver) {
        this.currentDriver = currentDriver;
      }
    });
  }
}
