import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { IUser } from "../entity/iuser";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem("currentIUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentIUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login(IUsername: string, password: string) {
    return this.http.post<string>(`${environment.apiUrl}/Users/authenticate`, { IUsername, password })
      .pipe(map(IUser => {
        // login successful if there's a jwt token in the response
        if (IUser && IUser.token) {
          // store IUser details and jwt token in local storage to keep IUser logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(IUser));
          this.currentUserSubject.next(IUser);
        }

        return IUser;
      }));
  }

  logout(): void {
    // remove IUser from local storage to log IUser out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
