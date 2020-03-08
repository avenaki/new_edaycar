import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileDriverComponent } from "./profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./profile-passenger/profile-passenger.component";
import { SignupComponent } from "./signup/signup.component";
import { TripsTableComponent } from "./trips-table/trips-table.component";





export const appRoutes: Routes = [

  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "signup",  component: SignupComponent,  pathMatch: "full" },
  { path: "create", component: CreateTripComponent, canActivate: [AuthGuard, RoleGuard], pathMatch: "full" },
  { path: "profile-driver", component: ProfileDriverComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "profile-passenger", component: ProfilePassengerComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "trips", component: TripsTableComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "", component: AboutComponent, canActivate: [AuthGuard], pathMatch: "full" },



];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
