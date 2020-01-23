import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AboutComponent} from './about/about.component';



export const appRoutes: Routes = [
  { path: "", component: AboutComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
