import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { UserModel } from "../entity/user-model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}api/account/login`, { login: username, password: password })
      .pipe(map(data => {
        if (data.login && data.token) {
          // store IUser details and jwt token in local storage to keep IUser logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;
      }));
  }

  logout(): void {
    // remove IUser from local storage to log IUser out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
