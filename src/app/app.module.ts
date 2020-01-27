import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TripsTableComponent } from './trips-table/trips-table.component';
import {RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SignupDriverComponent } from './signup/signup-driver/signup-driver.component';
import { SignupPassengerComponent } from './signup/signup-passenger/signup-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsTableComponent,
    AboutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
