import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Passenger } from "../models/passenger";
import { UserModel } from "../models/user-model";
import * as PassengerActions from "../store/actions/passenger.actions";
import * as fromPassenger from "../store/reducers/passenger.reducer";
import { AppState } from "../store/state/app.state";
import { Validator } from "../validators";

@Component({
    selector: "app-profile-passenger",
    templateUrl: "./profile-passenger.component.html",
    styleUrls: ["./profile-passenger.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProfilePassengerComponent implements OnInit, OnDestroy {

  currentPassenger: Passenger;
  currentPassenger$: Observable<Passenger>;
  currentUser: UserModel;
  passengerForm: FormGroup;

  constructor( private fb: FormBuilder,
               private validator: Validator,
               private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
    this.currentPassenger$ = this.store.select(fromPassenger.selectCurrentPassenger);
    this.currentPassenger$.subscribe(currentPassenger => {
      if (currentPassenger) {
        this.currentPassenger = currentPassenger;
        this.updateFormValues(this.currentPassenger);
      }
    });

  }
  private initForm(): void {
    this.passengerForm = this.fb.group({
      login: new FormControl("", [Validators.required,  Validators.minLength(4),
        Validators.pattern("^[A-Z a-z 0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      surname: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      patronymic: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
      birthdate: new FormControl("", this.validator.birthDateValidator),
      mobileNumber: new FormControl("", [Validators.required,  Validators.pattern(/8\d{10}/)]),
      accountPhoto: new FormControl(""), });
  }

  updateFormValues(passenger: Passenger): void {
    const newBirthdate = new Date(passenger.birthdate);
    const day = (newBirthdate.getDate() < 10) ? "0" + newBirthdate.getDate() : newBirthdate.getDate();
    const month = (newBirthdate.getMonth() + 1 < 10) ? "0" + (newBirthdate.getMonth() + 1) : newBirthdate.getMonth() + 1;
    const year = newBirthdate.getFullYear();
    this.passengerForm.patchValue({
      login: passenger.login,
      password: atob(passenger.password),
      name: passenger.name,
      surname: passenger.surname,
      patronymic: passenger.patronymic,
      birthdate: year + "-" + month + "-" + day,
      mobileNumber: passenger.mobileNumber,
      accountPhoto: passenger.accountPhoto,
    });
  }
  saveChanges(): void {
    const updatedPassenger = new Passenger( this.passengerForm.get("login").value,
      btoa(this.passengerForm.get("password").value), this.passengerForm.get("name").value,
      this.passengerForm.get("surname").value, this.passengerForm.get("patronymic").value,
      this.passengerForm.get("birthdate").value, String(this.passengerForm.get("mobileNumber").value),
      this.passengerForm.get("accountPhoto").value);
    this.store.dispatch(PassengerActions.editPassenger(updatedPassenger));
  }
  onFileChange(event: Event): void {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target && target.files.length) {
      const file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.passengerForm.patchValue({
          accountPhoto: reader.result
        });
      };
    }
  }
  ngOnDestroy(): void {

  }
}

