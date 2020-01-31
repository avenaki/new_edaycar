import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";




export const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "login", component: LoginComponent},
  { path: "signup",  loadChildren: "./signup/signup.module#SignupModule"},

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
