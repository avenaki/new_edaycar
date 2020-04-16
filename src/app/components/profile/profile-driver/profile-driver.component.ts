import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Driver } from "../../../models/driver";
import * as DriverActions from "../../../store/actions/driver.actions";
import * as fromDriver from "../../../store/reducers/driver.reducer";
import { AppState } from "../../../store/state/app.state";
import { Validator } from "../../../validators";

@Component({
  selector: "app-profile-driver",
  templateUrl: "./profile-driver.component.html",
  styleUrls: ["../profile.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProfileDriverComponent implements OnInit, OnDestroy {

  currentDriver: Driver;
  currentDriver$: Observable<Driver>;
  currentDriverSubscription: Subscription;
  driverForm: FormGroup;
  errorTextMessage = "";

  constructor( private fb: FormBuilder,
               private validator: Validator,
               private store: Store<AppState>,
               private  cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.currentDriver$ = this.store.select(fromDriver.selectCurrentDriver);
    this.currentDriverSubscription = this.currentDriver$.subscribe(currentDriver => {
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
      experience: new FormControl("", [Validators.required, this.validator.experienceValidator]),
      name: new FormControl("", [Validators.required, Validators.pattern(/^[А-я]+$/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/^[А-я]+$/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/^[А-я]+$/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/),
        Validators.minLength(11), Validators.maxLength(11)]),
      carModel: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z a-z 0-9]+$/)]),
      color: new FormControl("", [Validators.required, Validators.pattern(/^[А-я]+$/)]),
      accountPhoto: new FormControl(""),
    });
  }

  updateFormValues(driver: Driver): void {
    const newBirthdate = new Date(driver.birthdate);
    const day = (newBirthdate.getDate() < 10) ? "0" + newBirthdate.getDate() : newBirthdate.getDate();
    const month = (newBirthdate.getMonth() + 1 < 10) ? "0" + (newBirthdate.getMonth() + 1) : newBirthdate.getMonth() + 1;
    const year = newBirthdate.getFullYear();
    this.driverForm.patchValue({
      login: driver.login,
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
    if ( this.driverForm.valid) {
      const updatedDriver = new Driver(this.driverForm.get("login").value,
        this.currentDriver.password, this.driverForm.get("name").value,
        this.driverForm.get("surname").value, this.driverForm.get("patronymic").value,
        this.driverForm.get("birthdate").value, String(this.driverForm.get("mobileNumber").value),
        Number(this.driverForm.get("experience").value), this.driverForm.get("color").value,
        this.driverForm.get("accountPhoto").value, this.driverForm.get("carModel").value,
        this.currentDriver.trips);
      this.store.dispatch(DriverActions.editDriver(updatedDriver));
    } else {
     this.errorTextMessage = " Не все поля заполнены или введены корректно!";
     this.cdr.markForCheck();
    }
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

  ngOnDestroy(): void {
    this.currentDriverSubscription.unsubscribe();
  }

}
