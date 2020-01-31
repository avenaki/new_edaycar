import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SignupDriverComponent } from "./signup-driver/signup-driver.component";
import { SignupPassengerComponent } from "./signup-passenger/signup-passenger.component";
import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";

@NgModule({
  declarations: [
    SignupDriverComponent,
    SignupPassengerComponent,
    SignupComponent,
  ],
  exports: [
    SignupDriverComponent,
    SignupPassengerComponent,
    SignupComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ ]
})
export class SignupModule { }
