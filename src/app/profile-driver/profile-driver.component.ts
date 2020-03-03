import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Driver } from "../models/driver";
import { UserModel } from "../models/user-model";
import * as DriverActions from "../store/actions/driver.actions";
import * as fromDriver from "../store/reducers/driver.reducer";
import { AppState } from "../store/state/app.state";
import { Validator } from "../validators";
@Component({
  selector: "app-profile-driver",
  templateUrl: "./profile-driver.component.html",
  styleUrls: ["./profile-driver.component.less"]
})

export class ProfileDriverComponent implements OnInit {

  currentDriver: Driver;
  currentDriver$: Observable<Driver>;
  currentUser: UserModel;
  driverForm: FormGroup;

  constructor( private fb: FormBuilder,
               private validator: Validator,
               private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
    this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
    this.currentDriver$.subscribe(currentDriver => {
      if (currentDriver) {
        this.currentDriver = currentDriver;
        this.updateFormValues(this.currentDriver);
      }
    });

  }
  private initForm(): void {
    this.driverForm = this.fb.group({
      login: new FormControl("", [Validators.required,  Validators.minLength(4),
        Validators.pattern("^[A-Z a-z 0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/)]),
      carModel: new FormControl(""),
      color: new FormControl(""),
      accountPhoto: new FormControl(""),
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator])});
  }

  updateFormValues(driver: Driver): void {
    driver.birthdate = new Date(driver.birthdate);
    const day = (driver.birthdate.getDate() < 10) ? "0" + driver.birthdate.getDate() : driver.birthdate.getDate();
    const month = (driver.birthdate.getMonth() + 1 < 10) ? "0" + (driver.birthdate.getMonth() + 1) : driver.birthdate.getMonth() + 1;
    const year = driver.birthdate.getFullYear();
    this.driverForm.patchValue({
      login: driver.login,
      password: atob(driver.password),
      name: driver.name,
      surname: driver.surname,
      patronymic: driver.patronymic,
      birthdate: year + "-" + month + "-" + day,
      mobileNumber: driver.mobileNumber,
      carModel: driver.carModel,
      color: driver.color,
      accountPhoto: driver.accountPhoto,
      experience: driver.experience,
    });
  }
  saveChanges(): void {
    const updatedDriver = new Driver( this.driverForm.get("login").value,
      btoa(this.driverForm.get("password").value), this.driverForm.get("name").value,
      this.driverForm.get("surname").value, this.driverForm.get("patronymic").value,
      new Date(this.driverForm.get("birthdate").value ), String(this.driverForm.get("mobileNumber").value),
      Number(this.driverForm.get("experience").value, ), this.driverForm.get("color").value,
      this.driverForm.get("accountPhoto").value, this.driverForm.get("carModel").value,
      this.currentDriver.trips);
      this.store.dispatch(DriverActions.editDriver(updatedDriver));
  }


  onFileChange(event: Event): void {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target && target.files.length) {
      const file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.driverForm.patchValue({
          accountPhoto: reader.result
        });
      };
    }
  }
}
