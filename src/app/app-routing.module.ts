import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";




export const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "login", component: LoginComponent},
  { path: "signup",  component: SignupComponent },
  { path: "create", component: CreateTripComponent, canActivate: [AuthGuard] },


];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
