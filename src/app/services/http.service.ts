import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Driver } from "../models/driver";
import { Passenger } from "../models/passenger";
import { Trip } from "../models/trip";
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
  public addTrip( trip: Trip ): void {
    this.http.post(this.apiUrl + "trip/createtrip", trip ).subscribe();
  }
  public login(login: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl + "account/login", { login: login, password: password });
  }
  public getDriverByLogin(login: string): Observable<Driver> {
    return this.http.get<Driver>(this.apiUrl + "account/getdriver/" + login);
  }
  public getPassengerByLogin(login: string): Observable<Driver> {
    return this.http.get<Driver>(this.apiUrl + "account/getpassenger/" + login);
  }
  public getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + "account/getdrivers/");
  }
  public updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(this.apiUrl + "account/updatedriver/", driver);
  }
  public updatePaasenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(this.apiUrl + "account/updatedriver/", {passenger: passenger});
  }
}
