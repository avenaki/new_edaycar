import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Driver } from "../models/driver";
import { Passenger } from "../models/passenger";
import { Trip } from "../models/trip";
import { UserModel } from "../models/user-model";
import * as TripActions from "../store/actions/trip.actions";
import * as fromDriver from "../store/reducers/driver.reducer";
import * as fromPassenger from "../store/reducers/passenger.reducer";
import * as fromTrip from "../store/reducers/trip.reducer";
import * as fromUser from "../store/reducers/user.reducer";
import { AppState } from "../store/state/app.state";

@Component({
  selector: "app-trips-table",
  templateUrl: "./trips-table.component.html",
  styleUrls: ["./trips-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsTableComponent implements OnInit {

  trips$: Observable<Trip[]>;
  trips: Trip[];
  modal = false;
  userIsDriver = false;
  sortUpStart = false;
  sortUpFinish = false;
  sortUpMaxPassengers = false;
  currentUser$: Observable<UserModel>;
  currentDriver$: Observable<Driver>;
  currentPassenger$: Observable<Passenger>;
  currentUser: UserModel;
  currentDriver: Driver;
  currentPassenger: Passenger;


  constructor( private store: Store< AppState >,
               private cdr: ChangeDetectorRef) {
    this.currentUser$ = store.select(fromUser.selectUserCurrent);
  }
  ngOnInit(): void {
    this.currentUser$.subscribe( (currentUser) => {
      if (currentUser.role === "driver") {
        this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
        this.userIsDriver = true;
      } else {
        this.currentPassenger$ = this.store.select(fromPassenger.selectCurrentPassenger);
      }
    });
      this.store.dispatch(TripActions.loadTrips());
      this.trips$ = this.store.select(fromTrip.selectAllTrips);
      this.trips$.subscribe(trips => {
        if (trips) {
          this.trips = trips;
          this.cdr.detectChanges();
          if ( this.userIsDriver) {
            this.currentDriver$.subscribe( (currentDriver) => {
              this.currentDriver = currentDriver;
            });
          } else {
            this.currentPassenger$.subscribe( (currentPassenger) => {
              this.currentPassenger = currentPassenger;
            });
          }
        }
      });
    }

  sort(propName: keyof Trip, order: string): void {
    const sortedTrips = [...this.trips];
    sortedTrips.sort((a, b) => {
        if (a[propName] < b[propName]) {
          return -1;
        }
        if (a[propName] > b[propName]) {
          return 1;
        }
        return 0;
      });
    if (order === "DESC") {
      sortedTrips.reverse();
    }
    this.trips = sortedTrips;
    this.cdr.detectChanges();
}
}
