import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Validator } from "../validators";

@Component({
  selector: "app-signup-passenger",
  templateUrl: "./signup-passenger.component.html",
  styleUrls: ["./signup-passenger.component.css"]
})
export class SignupPassengerComponent implements OnInit {

  signupPassengerForm: FormGroup;
  constructor(private fb: FormBuilder, protected validator: Validator) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupPassengerForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/)]),
      login: new FormControl("", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8),
      ])
    });
  }

}
