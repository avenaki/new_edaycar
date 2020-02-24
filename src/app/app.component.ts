import { Component, OnInit } from "@angular/core";
import {  NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { UserModel } from "./entity/user-model";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  title = "edaycar";
  currentUser: UserModel;

    constructor(private authService: AuthenticationService, private router: Router) {
      this.router.events.pipe(filter (event => event instanceof NavigationEnd)).subscribe(() => {
        this.currentUser = authService.currentUserValue;
        if ( router.url === "profile") {
        if (this.currentUser.role === "driver") {
          this.router.navigate(["profile-driver"]);
        } else {
          this.router.navigate(["profile-passenger"]);
        }
        }
      });
    }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
