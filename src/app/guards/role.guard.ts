import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import * as UserActions from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";



@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  currentUser$: Observable<UserState>;
  currentUserSubscription: Subscription;
  private currentUser: UserModel;
  constructor(
    private store: Store<{ user: UserState }>) {   this.currentUser$ = store.pipe(select("user"));
    this.store.dispatch(UserActions.getUser());
    this.currentUserSubscription = this.currentUser$
      .pipe(
        map(x => {
          this.currentUser = x.user;
        }),
      )
      .subscribe(); }

  canActivate(_route: ActivatedRouteSnapshot): boolean {
    return this.currentUser.role === "driver";
  }
}
