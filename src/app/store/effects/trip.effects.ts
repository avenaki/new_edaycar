import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
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
        this.httpService.addTrip(action.trip).pipe(
          map(() => {
            return TripActions.addTripSuccess(action.trip);
          }),
          catchError((error: Error) => {
            return of(TripActions.addTripFail(error));
          }),
        ),
      ),
    );
  });
}
