import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {SignupPassengerComponent} from './signup-passenger/signup-passenger.component';
import {SignupDriverComponent} from './signup-driver/signup-driver.component';


export const appRoutes: Routes = [
  { path:"", component: SignupDriverComponent},
  { path:"signup/driver", component: SignupDriverComponent, outlet: "signup"},
  { path:"signup/passenger", component: SignupPassengerComponent, outlet: "signup"}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
