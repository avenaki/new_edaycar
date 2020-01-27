import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {SignupDriverComponent} from './signup/signup-driver/signup-driver.component';



export const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "login", component: LoginComponent},
  { path:"signup",  loadChildren: "./signup/signup.module"},

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
