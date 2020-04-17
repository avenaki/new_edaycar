import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Driver } from "../../../models/driver";
import { Passenger } from "../../../models/passenger";
import { Trip } from "../../../models/trip";
import { UserModel } from "../../../models/user-model";
import * as TripActions from "../../../store/actions/trip.actions";
import * as fromDriver from "../../../store/reducers/driver.reducer";
import * as fromPassenger from "../../../store/reducers/passenger.reducer";
import * as fromTrip from "../../../store/reducers/trip.reducer";
import * as fromUser from "../../../store/reducers/user.reducer";
import { AppState } from "../../../store/state/app.state";

@Component({
  selector: "app-trips-table",
  templateUrl: "./trips-table.component.html",
  styleUrls: ["./trips-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsTableComponent implements OnInit, OnDestroy {
  trips$: Observable<Trip[]>;
  trips: Trip[];
  modal = false;
  editModal = false;
  startChatModal = false;
  startChatUserLogin: string;
  currentEditTripId: string;
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
               private cdr: ChangeDetectorRef,
               private router: Router) {
    this.currentUser$ = store.select(fromUser.selectUserCurrent);
    this.store.dispatch(TripActions.loadTrips());
    this.trips$ = this.store.select(fromTrip.selectAllTrips);
  }
  ngOnInit(): void {
    this.currentUser$.subscribe( (currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
      if (currentUser.role === "driver") {
        this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
        this.userIsDriver = true;
        this.currentDriver$.subscribe( (currentDriver) => {
          if ( currentDriver) {
            this.currentDriver = currentDriver;
            this.cdr.markForCheck();
          }
        });
      } else {
        this.currentPassenger$ = this.store.select(fromPassenger.selectCurrentPassenger);
        this.currentPassenger$.subscribe( (currentPassenger) => {
          this.currentPassenger = currentPassenger;
          this.cdr.markForCheck();
        });
      }
    }});
      this.trips$.subscribe(trips => {
        if (trips) {
          this.trips = trips;
          this.cdr.markForCheck();
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
    this.cdr.markForCheck();
}

  closeModal(): void {
     this.modal = false;
     this.editModal = false;
     this.startChatModal = false;
     this.cdr.markForCheck();
  }

  update(): void {
    this.editModal = true;
  }

  ngOnDestroy(): void {
   this.cdr.detach();

  }

  editTrip(id: string): void {
    this.editModal = true;
    this.currentEditTripId = id;
  }

  addTrip(): void {
  this.router.navigate(["create-trip"]);
  }

  startChat(login: string): void {
  this.startChatUserLogin = login;
  this.startChatModal = true;
  }
}
