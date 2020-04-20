import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "./models/user-model";
import * as DriverActions from "./store/actions/driver.actions";
import * as PassengerActions from "./store/actions/passenger.actions";
import * as UserActions from "./store/actions/user.actions";
import { UserState } from "./store/state/user.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "edaycar";
  currentUser$: Observable<UserState>;
  currentUserSubscription: Subscription;
  public currentUserError: Error = null;
  public currentUser: UserModel;

  constructor(private router: Router,
              private store: Store<{ user: UserState }>) {
    this.currentUser$ = store.pipe(select("user"));
    console.log(this.store, this.currentUser, this.currentUserError);
  }
  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser());
    this.currentUserSubscription = this.currentUser$
      .pipe(
        map(x => {
          this.currentUser = x.user;
          this.currentUserError = x.userError;
          if (this.currentUser) {
            if (this.currentUser.role === "driver") {
              const payload = {
                username: this.currentUser.login,
              };
              this.store.dispatch(DriverActions.load(payload));
            } else {
              const payload = {
                username: this.currentUser.login,
              };
              this.store.dispatch(PassengerActions.load(payload));
            }
          }}),
      )
      .subscribe();
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
    this.currentUser = null;
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
     if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
     }
  }
}
