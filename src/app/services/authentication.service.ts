import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {  Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { UserModel } from "../models/user-model";
import * as UserActions from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private apiUrl = environment.apiUrl;

  currentUser$: Observable<UserState>;
  constructor(private http: HttpClient, private store: Store<{ user: UserState }>) {
    this.store.dispatch(UserActions.getUser());
    this.currentUser$ = store.pipe(select("user"));

  }

  login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>
    (this.apiUrl + "account/login", { login: username, password: password });
  }
  getToken(): string {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    if (data === null) {
      return " ";
    }
    return data.token;
  }


}
