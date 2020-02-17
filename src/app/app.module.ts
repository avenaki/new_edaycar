import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { LoginComponent } from "./login/login.component";
import { HttpService } from "./services/http.service";
import { SignupComponent } from "./signup/signup.component";
import { TripsTableComponent } from "./trips-table/trips-table.component";



@NgModule({
  declarations: [
    AppComponent,
    TripsTableComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    CreateTripComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
