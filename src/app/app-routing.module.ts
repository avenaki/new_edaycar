import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileDriverComponent } from "./profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./profile-passenger/profile-passenger.component";
import { SignupComponent } from "./signup/signup.component";




export const appRoutes: Routes = [

  { path: "login", component: LoginComponent},
  { path: "signup",  component: SignupComponent },
  { path: "create", component: CreateTripComponent, canActivate: [AuthGuard] },
  { path: "profile-driver", component: ProfileDriverComponent, canActivate: [AuthGuard]},
  { path: "profile-passenger", component: ProfilePassengerComponent, canActivate: [AuthGuard]},



];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
