import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Injectable({
  providedIn: "root"
})
export class Validator {
  birthDateValidator (control: FormControl): { [s: string]: boolean } {
    const valueToDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    if (valueToDate.getTime() > currentDate.getTime() || valueToDate.getTime().toString() === "NaN") {
      return {"birthDate": true};
    }
    return null;
  }
  experienceValidator (control: FormControl): { [s: string]: boolean } {
    if (2 >= control.value || control.value >= 72 ) {
      return {"experience": true};
    }
    return null;
  }

  matchingPasswordsValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.controls["passwordKey"].value !== group.controls["passwordConfirm"].value) {
      return {"passwords": true};
    }
    return null;
  }

}
