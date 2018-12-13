import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.authService.getToken();
       request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });

    return next.handle(request).catch((err: any, caught) => {
      this.handleError(err);
      return Observable.throw(err);
    });
  }

  handleError(err: any) {
         if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        // unauthorized users
        swal('unauthorized user');
        this.authService.Logout();
      } else if (err.status === 401) {
        // access rights issue
        localStorage.clear();
        this.router.navigateByUrl('login');
        // this.toastService.knownError(this.infoMsg);
      } else if (err.status === 400) {
        // DO NOTHING HERE
        // Bad Login credentials, this error has been handled at the login page itself, 
        // hence ignored here
      } else if (err.status === 502) {
        // server issue
        swal('server is down. Sorry for the inconvience caused');
      }else if (err.status === 500) {
        // server issue
        swal(err.statusText);
      }else if (err.status === 0) {
        // No Internet cases(Most of the times)
        // this.toastService.noInternetAlert();
        swal('Request failed');
      } else {

        if (err.hasOwnProperty('error') && (err.error.hasOwnProperty('message')) || err.error.hasOwnProperty('error')) {
          swal(`${err.error.message || err.error.error}`);
        } else {
          //swal('unknown error');
        }
      }
    } else {
         // swal('unknown error');
    }
  }
}
