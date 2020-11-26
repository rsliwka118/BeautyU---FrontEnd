import { Injectable, NgZone } from "@angular/core";
import { 
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap, delay } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { AccountService } from "../auth/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private refreshTokenInProgress = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  
  constructor(
    public authService: AuthService,
    private accountService: AccountService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
    catchError(error => {
      
      if (
          request.url.includes("token") ||
          request.url.includes("login") ||
          request.url.includes("register")
      ) {

          if (request.url.includes("token")) {
              this.accountService.logout()
          }

          return throwError(error);
      }

      if (error.status !== 403) {
          return throwError(error)
      }

      if (this.refreshTokenInProgress) {
           return this.refreshTokenSubject.pipe(
              delay(0),
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(request))))
      } else {
          this.refreshTokenInProgress = true;

          this.refreshTokenSubject.next(null);
          
          return this.authService
              .refreshToken().pipe(
              switchMap((token: any) => {
                  
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(token.accessToken)
                  this.authService.setToken(token.accessToken)
                  return next.handle(this.addAuthenticationToken(request))
              }),
              catchError((error: any) => {
                  this.refreshTokenInProgress = false;

                  this.accountService.logout()
                  return throwError(error)
              }));
     }
  })) as Observable<HttpEvent<any>>
}

addAuthenticationToken(request: HttpRequest<any>) {
  
  const accessToken = this.authService.getToken()

  if (!accessToken) {
      return request
  }
  return request.clone({
      setHeaders: {
          authorization: this.authService.getToken()
      }
  });
}
}