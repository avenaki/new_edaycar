import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Passenger } from "../../models/passenger";
import { HttpService } from "../../services/http.service";
import * as PassengerActions from "../actions/passenger.actions";

@Injectable()
export class PassengerEffects {
  constructor(private action$: Actions,
              private httpService: HttpService) {
  }

  load$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PassengerActions.load),
      mergeMap(action =>
        this.httpService.getPassengerByLogin(action.username).pipe(
          map((data: Passenger) => {
            return PassengerActions.loadSuccess(data);
          }),
          catchError((error: Error) => {
            return of(PassengerActions.loadFail(error));
          }),
        ),
      ),
    );
  });
  loadPassengers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PassengerActions.loadPassengers),
      mergeMap(() =>
        this.httpService.getPassengers().pipe(
          map((data: Passenger[]) => {
            const payload = {
              passengers: data,
            };
            return PassengerActions.loadPassengersSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(PassengerActions.loadPassengersFail(error));
          }),
        ),
      ),
    );
  });
  editPassenger$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PassengerActions.editPassenger),
      mergeMap(action =>
        this.httpService.updatePassenger(action).pipe(
          map(() => {
            return PassengerActions.editPassengerSuccess(action);
          }),
          catchError((error: Error) => {
            return of(PassengerActions.editPassengerFail(error));
          }),
        ),
      ),
    );
  });
}
