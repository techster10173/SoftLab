import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(req.url.includes(environment.apiURL.default)){
      return from(this.auth.idToken).pipe(switchMap(token => {
          if(token){
              const authReq = req.clone({
                  setHeaders: {
                      'Content-Type': 'application/json',
                       Authorization: token,
                      'Access-Control-Allow-Headers': 'Authorization',
                  }
              });
              return next.handle(authReq);
          }
          return next.handle(req);
      }));
    }
    return next.handle(req);
  }
}
