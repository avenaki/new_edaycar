import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Driver } from "../entity/driver";
import { AuthenticationService } from "../services/authentication.service";
import { HttpService } from "../services/http.service";
import { Validator } from "../validators";

@Component({
  selector: "app-profile-driver",
  templateUrl: "./profile-driver.component.html",
  styleUrls: ["./profile-driver.component.less"]
})

export class ProfileDriverComponent implements OnInit {

  currentDriver: Driver;
  driverForm: FormGroup;
  selectedFile: ImageSnippet;
  constructor(private authService: AuthenticationService, private httpService: HttpService, private fb: FormBuilder,
              private validator: Validator) {

  }

  ngOnInit(): void {
    this.httpService.getDriverByLogin(this.authService.currentUserValue.login).subscribe(( user ) => {
      this.currentDriver = user;
      this.initForm();
    });
  }
  private initForm(): void {
    this.driverForm = this.fb.group({
      login: new FormControl(this.currentDriver.login, [Validators.required,  Validators.minLength(4),
        Validators.pattern("^[A-Z a-z 0-9]+$")]),
      password: new FormControl(atob(this.currentDriver.password), [Validators.required, Validators.minLength(8)]),
      name: new FormControl(this.currentDriver.name, [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl(this.currentDriver.surname, [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl(this.currentDriver.patronymic, [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl(this.currentDriver.birthDate.toDateString(), this.validator.birthDateValidator),
      mobileNumber: new FormControl(this.currentDriver.mobileNumber, [Validators.required,  Validators.pattern(/8\d{10}/)]),
      carModel: new FormControl(""),
      color: new FormControl(""),
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator])});
  }

  saveChanges(): void {
    const changedDriver = new Driver( this.driverForm.controls["login"].value,
      btoa(this.driverForm.controls["password"].value), this.driverForm.controls["name"].value,
      this.driverForm.controls["surname"].value, this.driverForm.controls["patronymic"].value,
      new Date(this.driverForm.controls["birthdate"].value), String(this.driverForm.controls["mobileNumber"].value),
      Number(this.driverForm.controls["experience"].value), null, null, null,  null);
    this.httpService.addDriver(changedDriver);
  }


}
