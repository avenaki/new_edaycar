import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private _authService: AuthenticationService) {}
  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this._authService.getToken();
    const modifiedReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);
  }
}
