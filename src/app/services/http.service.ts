import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Driver } from "../entity/identity/driver";



@Injectable({
  providedIn: "root"
})
export class HttpService {
  apiUrl = "http://localhost:5000/";
  constructor(private http: HttpClient) { }
  public addDriver( driver: Driver ): void {
    this.http.post(this.apiUrl + "api/account/registrdriver",   driver ).subscribe();
  }
}
