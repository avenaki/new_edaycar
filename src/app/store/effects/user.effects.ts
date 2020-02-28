import { Injectable } from "@angular/core";

import { Actions, createEffect,  ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserModel } from "../../entity/user-model";
import { AuthenticationService } from "../../services/authentication.service";
import * as UserActions from "../actions/user.actions";



@Injectable()
export class UserEffects {
  constructor(private authService: AuthenticationService, private action$: Actions) {
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

}
