import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserModel } from "./models/user-model";
import * as DriverActions from "./store/actions/driver.actions";
import * as UserActions from "./store/actions/user.actions";
import * as fromUser from "./store/reducers/user.reducer";
import { UserState } from "./store/state/user.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  title = "edaycar";
  currentUser$: Observable<UserModel>;
  private currentUser: UserModel;

  constructor(private router: Router,
              private store: Store<{ user: UserState }>) {}
  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser());
    this.currentUser$ = this.store.select(fromUser.selectUserCurrent);
    this.currentUser$.subscribe(currentUser => {
      if (currentUser) {
        this.currentUser = currentUser;
        const payload = { username: this.currentUser.login };
        if ( this.currentUser.role === "driver") {
          this.store.dispatch(DriverActions.load(payload));
        } else {
          // this.store.dispatch(PassengerActions.load(payload))
      }
      }
    });
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
    this.router.navigate(["/login"]);
  }

  // ngOnDestroy(): void {
    // if (this.currentUserSubscription) {
     // this.currentUserSubscription.unsubscribe();
   //  }
  // }
}
