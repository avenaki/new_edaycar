import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Driver } from "../models/driver";
import { Passenger } from "../models/passenger";
import { TakeTripModel } from "../models/take-trip-model";
import { Trip } from "../models/trip";
import { TripSearchFilter } from "../models/trip-search-filter";
import { UserModel } from "../models/user-model";


@Injectable({
  providedIn: "root"
})
export class HttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public addDriver( driver: Driver ): Observable<UserModel>  {
    return this.http.post<UserModel>(this.apiUrl + "account/registerdriver", driver );
  }
  public addPassenger( passenger: Passenger ): Observable<UserModel>  {
    return this.http.post<UserModel>(this.apiUrl + "account/registerpassenger", passenger );
  }
  public addTrip( trip: Trip ): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl + "trip/createtrip", trip );
  }
  public login(login: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl + "account/login", { login: login, password: password });
  }
  public getDriverByLogin(login: string): Observable<Driver> {
    return this.http.get<Driver>(this.apiUrl + "account/getdriver/" + login);
  }
  public getPassengerByLogin(login: string): Observable<Passenger> {
    return this.http.get<Passenger>(this.apiUrl + "account/getpassenger/" + login);
  }
  public getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + "account/getdrivers/");
  }
  public getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl + "account/getdpassengers/");
  }
  public updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(this.apiUrl + "account/updatedriver/", driver);
  }
  public updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(this.apiUrl + "account/updatepassenger/",  passenger);
  }
  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl + "trip/get/");
  }
  public deleteTrip(id: string ): Observable<string> {
    const httpParams = new HttpParams().set("id", id);
    const  options = { params: httpParams };
    return this.http.delete<string>(this.apiUrl + "trip/delete/", options);
  }
  public filterTrips(filter: TripSearchFilter): Observable<Trip[]> {
    return this.http.post<Trip[]>(this.apiUrl + "trip/filtertrips/",  filter);
  }
  public takeTrip(model: TakeTripModel): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl + "trip/taketrip/",  model);
  }
}
