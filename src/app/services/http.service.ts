import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Driver } from "../entity/driver";
import { Trip } from "../entity/trip";


@Injectable({
  providedIn: "root"
})
export class HttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public addDriver( driver: Driver ): void {
    this.http.post(this.apiUrl + "api/account/registerdriver", driver ).subscribe();
  }
  public addTrip( trip: Trip ): void {
    this.http.post(this.apiUrl + "api/trip/createtrip", trip ).subscribe();
  }
  public login(login: string, password: string): Observable<string> {
    return this.http.post<string>(this.apiUrl + "api/account/login", { login: login, password: password });
  }
}
