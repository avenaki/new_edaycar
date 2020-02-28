import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {  Store } from "@ngrx/store";
import * as UserActions from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private store: Store<{ user: UserState }>,
              private router: Router) {

  }

  ngOnInit(): void {

    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: new FormControl("", [Validators.required,  Validators.minLength(4), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8),
      ])
    });
  }

  login(): void {
    const payload = {
      login: this.loginForm.controls["login"].value,
      password: btoa(this.loginForm.controls["password"].value)
    };
    this.store.dispatch(UserActions.login(payload));
    this.router.navigate(["/"]);
  }
}

