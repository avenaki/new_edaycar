import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Trip } from "../../models/trip";
import { HttpService } from "../../services/http.service";
import * as TripActions from "../actions/trip.actions";

@Injectable()
export class TripEffects {
  constructor(private action$: Actions,
              private httpService: HttpService) {
  }

  addTrip$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.addTrip),
      mergeMap(action =>
        this.httpService.addTrip(action).pipe(
          map(() => {
            return TripActions.addTripSuccess(action);
          }),
          catchError((error: Error) => {
            return of(TripActions.addTripFail(error));
          }),
        ),
      ),
    );
  });

  loadTrips$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.loadTrips),
      mergeMap(() =>
        this.httpService.getTrips().pipe(
          map((data: Trip[]) => {
            const payload = {
              trip: data,
            };
            return TripActions.loadTripsSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(TripActions.loadTripsFail(error));
          }),
        ),
      ),
    );
  });
}
