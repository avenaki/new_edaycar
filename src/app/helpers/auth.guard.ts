import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import * as UserActions from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";



@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  currentUser$: Observable<UserState>;
  currentUserSubscription: Subscription;
  private currentUser: UserModel;
  constructor(
    private router: Router,
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
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
