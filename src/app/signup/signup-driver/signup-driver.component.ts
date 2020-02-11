import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Validator } from "../validators";


@Component({
  selector: "app-signup-driver",
  templateUrl: "./signup-driver.component.html",
  styleUrls: ["../signup.component.less"]
})
export class SignupDriverComponent implements OnInit {

  signupDriverForm: FormGroup;
  constructor(private fb: FormBuilder, protected validator: Validator) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupDriverForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/)]),
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator]),
      login: new FormControl("", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8),
      ])
    });
  }

}
