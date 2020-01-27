import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {SignupDriverComponent} from './signup-driver/signup-driver.component';
import {SignupPassengerComponent} from './signup-passenger/signup-passenger.component';
import {SignupComponent} from './signup.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupRoutingModule} from './signup-routing.module';

@NgModule({
  declarations: [
    SignupDriverComponent,
    SignupPassengerComponent,
    SignupComponent
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
  ],
  providers: [  ]
})
export class StudentFormsModule { }
