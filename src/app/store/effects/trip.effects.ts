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

  filterTrips$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.filterTrips),
      mergeMap((filter) =>
        this.httpService.filterTrips(filter).pipe(
          map((data: Trip[]) => {
            const payload = {
              trip: data,
            };
            return TripActions.filterTripsSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(TripActions.filterTripsError(error));
          }),
        ),
      ),
    );
  });
  takeTrip$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.takeTrip),
      mergeMap(action =>
        this.httpService.takeTrip(action).pipe(
          map(() => {
            return TripActions.loadTrips();
          }),
          catchError((error: Error) => {
            return of(TripActions.takeTripError(error));
          }),
        ),
      ),
    );
  });
  loadTrip$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.loadTrip),
      mergeMap((action) =>
        this.httpService.getTrip(action.id).pipe(
          map((data: Trip) => {
            return TripActions.loadTripSuccess(data);
          }),
          catchError((error: Error) => {
            return of(TripActions.loadTripFail(error));
          }),
        ),
      ),
    );
  });
  editTrip$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.editTrip),
      mergeMap(action =>
        this.httpService.updateTrip(action).pipe(
          map(() => {
            return TripActions.editTripSuccess(action);
          }),
          catchError((error: Error) => {
            return of(TripActions.editTripFail(error));
          }),
        ),
      ),
    );
  });
  deleteTrip$ = createEffect(() => {
    return this.action$.pipe(
      ofType(TripActions.deleteTrip),
      mergeMap(action =>
        this.httpService.deleteTrip(action.id).pipe(
          map(() => {
            return TripActions.deleteTripSuccess({id: action.id});
          }),
          catchError((error: Error) => {
            return of(TripActions.deleteTripFail(error));
          }),
        ),
      ),
    );
  });
}
