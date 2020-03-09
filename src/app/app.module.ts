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
import { AuthGuard } from "./guards/auth.guard";
import { PlacePipe } from "./guards/place.pipe";
import { RoleGuard } from "./guards/role.guard";
import { LoadingComponent } from "./loading/loading.component";
import { LoginComponent } from "./login/login.component";
import { ProfileDriverComponent } from "./profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./profile-passenger/profile-passenger.component";
import { HttpService } from "./services/http.service";
import { SignupComponent } from "./signup/signup.component";
import { DriverEffects } from "./store/effects/driver.effects";
import { PassengerEffects } from "./store/effects/passenger.effects";
import { TripEffects } from "./store/effects/trip.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers } from "./store/reducers/app.reducers";
import { CreateTripComponent } from "./trip/create-trip/create-trip.component";
import { TripFilterComponent } from "./trip/trip-filter/trip-filter.component";
import { TripsTableComponent } from "./trip/trips-table/trips-table.component";




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
    TripFilterComponent,
    LoadingComponent,
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
