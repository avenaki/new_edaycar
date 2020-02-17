import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Driver } from "../entity/identity/driver";
import { HttpService } from "../services/http.service";
import { Validator } from "./validators";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  registerDriver = true;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, protected validator: Validator, private httpService: HttpService) {}
  registerAsPassenger(): void {
    this.registerDriver = false;
  }
  registerAsDriver(): void {
    this.registerDriver = true;
  }
  ngOnInit(): void {
    this.initForm();
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
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator])
    });
  }

  submit(): void {
    const newDriver = new Driver( this.signupForm.controls["login"].value,
      this.signupForm.controls["password"].value, this.signupForm.controls["name"].value,
      this.signupForm.controls["surname"].value, this.signupForm.controls["patronymic"].value,
      new Date(this.signupForm.controls["birthdate"].value), String(this.signupForm.controls["mobileNumber"].value),
      Number(this.signupForm.controls["experience"].value), null);
    this.httpService.addDriver(newDriver);
  }
}
