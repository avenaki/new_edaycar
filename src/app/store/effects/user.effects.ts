import { Injectable } from "@angular/core";
import { Actions, createEffect,  ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserModel } from "../../models/user-model";
import { AuthenticationService } from "../../services/authentication.service";
import { HttpService } from "../../services/http.service";
import * as UserActions from "../actions/user.actions";



@Injectable()
export class UserEffects {
  constructor(private authService: AuthenticationService,
              private action$: Actions,
              private httpService: HttpService) {
  }

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.login),
      mergeMap(action =>
        this.authService.login(action.login, action.password).pipe(
          map((data: UserModel) => {
            return UserActions.loginSuccess(data);
          }),
          catchError((error: Error) => {
            return of(UserActions.loginFail(error));
          }),
        ),
      ),
    ); });

  signDriver$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.signDriver),
      mergeMap(action =>
        this.httpService.addDriver(action).pipe(
          map((user: UserModel) => {
          return UserActions.loginSuccess(user);
          }),
          catchError((error: Error) => {
            return of(UserActions.signDriverFail(error));
          }),
        ),
      ),
    ); });

  signPassenger$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.signPassenger),
      mergeMap(action =>
        this.httpService.addPassenger(action).pipe(
          map((user: UserModel) => {
            return UserActions.loginSuccess(user);
          }),
          catchError((error: Error) => {
            return of(UserActions.signPassengerFail(error));
          }),
        ),
      ),
    ); });


}
