import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AgmDirectionModule } from "agm-direction";
import { AlifeFileToBase64Module } from "alife-file-to-base64";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";
import { ChatComponent } from "./components/chat/chat.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileDriverComponent } from "./components/profile/profile-driver/profile-driver.component";
import { ProfilePassengerComponent } from "./components/profile/profile-passenger/profile-passenger.component";
import { SignupComponent } from "./components/signup/signup.component";
import { BaseTripComponent } from "./components/trips/base-trip/base-trip.component";
import { CreateTripComponent } from "./components/trips/create-trip/create-trip.component";
import { PopupComponent } from "./components/trips/popup/popup.component";
import { TripFilterComponent } from "./components/trips/trip-filter/trip-filter.component";
import { TripInfoComponent } from "./components/trips/trip-info/trip-info.component";
import { TripsTableComponent } from "./components/trips/trips-table/trips-table.component";
import { AuthGuard } from "./helpers/auth.guard";
import { MessageReceiverPipe } from "./helpers/message-receiver.pipe";
import { PlacePipe } from "./helpers/place.pipe";
import { RoleGuard } from "./helpers/role.guard";
import { TimePipe } from "./helpers/time.pipe";
import { HttpService } from "./services/http.service";
import { TokenInterceptor } from "./services/token-interceptor";
import { ChatEffects } from "./store/effects/chat.effects";
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
    ChatComponent,
    MessageReceiverPipe,
    PopupComponent,
    TripInfoComponent,
    BaseTripComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDUEQ4Jgq11dSpzuCuduVdFfFlDj8khY-4",
      libraries: ["places", "geometry"]
    }),
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AgmDirectionModule,
    AlifeFileToBase64Module,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([UserEffects, DriverEffects, TripEffects, PassengerEffects, ChatEffects]),
  ],
  providers: [HttpService, AuthGuard, RoleGuard, {  provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
