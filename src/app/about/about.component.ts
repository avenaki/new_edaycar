import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import { UserState } from "../store/state/user.state";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  currentUser$: Observable<UserState>;
  currentUserSubscription: Subscription;
  private currentUser: UserModel;
  constructor( private store: Store<{ user: UserState }>) {
    this.currentUser$ = store.pipe(select("user"));
  }
  ngOnInit(): void {
    this.currentUserSubscription = this.currentUser$
      .pipe(
        map(x => {
          this.currentUser = x.user;
        }),
      )
      .subscribe();
    console.log(this.currentUser, this.store);
  }

}
