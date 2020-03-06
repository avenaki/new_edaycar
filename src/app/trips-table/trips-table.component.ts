import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Trip } from "../models/trip";
import * as TripActions from "../store/actions/trip.actions";
import * as fromTrip from "../store/reducers/trip.reducer";
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

  constructor( private store: Store< AppState >) {
  }
  ngOnInit(): void {
      this.store.dispatch(TripActions.loadTrips());
      this.trips$ = this.store.select(fromTrip.selectAllTrips);
      this.trips$.subscribe(trips => {
        if (trips) {
          this.trips = trips;
        }
      });
    }
  }




