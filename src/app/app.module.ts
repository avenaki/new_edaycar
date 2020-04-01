import { AgmCoreModule } from "@agm/core";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AlifeFileToBase64Module } from "alife-file-to-base64";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";
import { CreateTripComponent } from "./components/create-trip/create-trip.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileDriverComponent } from "./components/profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./components/profile-passenger/profile-passenger.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TripFilterComponent } from "./components/trip-filter/trip-filter.component";
import { TripsTableComponent } from "./components/trips-table/trips-table.component";
import { AuthGuard } from "./helpers/auth.guard";
import { PlacePipe } from "./helpers/place.pipe";
import { RoleGuard } from "./helpers/role.guard";
import { TimePipe } from "./helpers/time.pipe";
import { HttpService } from "./services/http.service";
import { DriverEffects } from "./store/effects/driver.effects";
import { PassengerEffects } from "./store/effects/passenger.effects";
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
    TripsTableComponent,
    PlacePipe,
    TimePipe,
    TripFilterComponent,
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
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([UserEffects, DriverEffects, TripEffects, PassengerEffects]),
  ],
  providers: [HttpService, AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
