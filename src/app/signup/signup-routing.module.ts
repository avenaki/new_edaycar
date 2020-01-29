import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {SignupPassengerComponent} from './signup-passenger/signup-passenger.component';
import {SignupDriverComponent} from './signup-driver/signup-driver.component';
import {SignupComponent} from './signup.component';


const routes: Routes = [
  { path:"", component: SignupComponent, children: [
  { path:"driver", component: SignupDriverComponent},
  { path:"passenger", component: SignupPassengerComponent}]}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
