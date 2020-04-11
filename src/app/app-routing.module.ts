import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { ChatComponent } from "./components/chat/chat.component";
import { CreateTripComponent } from "./components/create-trip/create-trip.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileDriverComponent } from "./components/profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./components/profile-passenger/profile-passenger.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TripsTableComponent } from "./components/trips-table/trips-table.component";
import { AuthGuard } from "./helpers/auth.guard";
import { RoleGuard } from "./helpers/role.guard";





export const appRoutes: Routes = [

  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "signup",  component: SignupComponent,  pathMatch: "full" },
  { path: "create-trip", component: CreateTripComponent, canActivate: [AuthGuard, RoleGuard], pathMatch: "full" },
  { path: "profile-driver", component: ProfileDriverComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "profile-passenger", component: ProfilePassengerComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "trips", component: TripsTableComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "chat", component: ChatComponent, canActivate: [AuthGuard],  pathMatch: "full"},
  { path: "", component: AboutComponent,  pathMatch: "full" },



];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
