import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Driver } from "../../models/driver";
import { HttpService } from "../../services/http.service";
import * as DriverActions from "../actions/driver.actions";

@Injectable()
export class DriverEffects {
  constructor(private action$: Actions,
              private httpService: HttpService) {
  }

  load$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DriverActions.load),
      mergeMap(action =>
        this.httpService.getDriverByLogin(action.username).pipe(
          map((data: Driver) => {
            return DriverActions.loadSuccess(data);
          }),
          catchError((error: Error) => {
            return of(DriverActions.loadFail(error));
          }),
        ),
      ),
    );
  });
  loadDrivers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DriverActions.loadDrivers),
      mergeMap(() =>
        this.httpService.getDrivers().pipe(
          map((data: Driver[]) => {
            const payload = {
              drivers: data,
            };
            return DriverActions.loadDriversSuccess(payload);
          }),
          catchError((error: Error) => {
            return of(DriverActions.loadDriversFail(error));
          }),
        ),
      ),
    );
  });
  editDriver$ = createEffect(() => {
    return this.action$.pipe(
      ofType(DriverActions.editDriver),
      mergeMap(action =>
        this.httpService.updateDriver(action.driver).pipe(
          map(() => {
            return DriverActions.editDriverSuccess(action.driver);
          }),
          catchError((error: Error) => {
            return of(DriverActions.editDriverFail(error));
          }),
        ),
      ),
    );
  });
}
