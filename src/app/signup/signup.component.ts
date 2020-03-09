import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Driver } from "../models/driver";
import { Passenger } from "../models/passenger";
import * as UserActions from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";
import { Validator } from "../validators";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  registerDriver: boolean;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              protected validator: Validator,
              private store: Store<{ user: UserState }>,
              private router: Router) {
    this.registerDriver = true;
  }
  ngOnInit(): void {
    this.initForm();
  }
  registerAsPassenger(): void {
    this.registerDriver = false;

  }
  registerAsDriver(): void {
    this.registerDriver = true;
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/),
        Validators.minLength(11), Validators.maxLength(11)]),
      login: new FormControl("", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
      passwords: new FormGroup( {
      passwordKey: new FormControl("", [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl("", [Validators.required, Validators.minLength(8)])},
        [Validators.required, this.validator.matchingPasswordsValidator]),
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator])
    });
  }

  submit(): void {
    if ( this.registerDriver) {
    const newDriver = new Driver( this.signupForm.controls["login"].value,
      btoa(this.signupForm.controls["passwords"].value["passwordKey"]), this.signupForm.controls["name"].value,
      this.signupForm.controls["surname"].value, this.signupForm.controls["patronymic"].value,
      this.signupForm.controls["birthdate"].value, String(this.signupForm.controls["mobileNumber"].value),
      Number(this.signupForm.controls["experience"].value), null, null, null,  null);
    this.store.dispatch(UserActions.signDriver(newDriver));
    } else {
      const newPassenger = new Passenger( this.signupForm.controls["login"].value,
        btoa(this.signupForm.controls["passwords"].value["passwordKey"]), this.signupForm.controls["name"].value,
        this.signupForm.controls["surname"].value, this.signupForm.controls["patronymic"].value,
        this.signupForm.controls["birthdate"].value, String(this.signupForm.controls["mobileNumber"].value),
      null, null);
      this.store.dispatch(UserActions.signPassenger(newPassenger));
    }
    this.router.navigate([""]);
  }

  navigateToLogin(): void {
   this.router.navigate(["login"]);
  }
}
