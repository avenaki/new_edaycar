import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AlifeFileToBase64Module } from "alife-file-to-base64";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileDriverComponent } from "./profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./profile-passenger/profile-passenger.component";
import { HttpService } from "./services/http.service";
import { SignupComponent } from "./signup/signup.component";
import { DriverEffects } from "./store/effects/driver.effects";
import { TripEffects } from "./store/effects/trip.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers } from "./store/reducers/app.reducers";




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    CreateTripComponent,
    ProfileDriverComponent,
    ProfilePassengerComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBQ2nmOQs_9PACtE1IKMX-rT7b0UcW_ZiQ",
      libraries: ["places", "geometry"]
    }),
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlifeFileToBase64Module,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects, DriverEffects, TripEffects]),
  ],
  providers: [HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
