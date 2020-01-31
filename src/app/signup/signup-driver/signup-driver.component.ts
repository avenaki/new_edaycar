import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-signup-driver",
  templateUrl: "./signup-driver.component.html",
  styleUrls: ["./signup-driver.component.css"]
})
export class SignupDriverComponent implements OnInit {

  signupDriverForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupDriverForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(8)]),
      surname: new FormControl("", [Validators.required, Validators.minLength(8)]),
      patronymic: new FormControl("", [Validators.required, Validators.minLength(8)]),
      birthdate: new FormControl("", ),
      mobileNumber: new FormControl("", [Validators.required]),
      carModel: new FormControl("", [Validators.required, Validators.minLength(3)]),
      experience: new FormControl("", [Validators.required]),
      login: new FormControl("username", [Validators.required,  Validators.minLength(6), Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("password", [Validators.required, Validators.minLength(8),
      ])
    });
  }

}
