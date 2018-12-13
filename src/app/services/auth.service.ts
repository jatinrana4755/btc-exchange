import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http'; // for post request with data
import swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  constructor(private http: Http,
    private htttp: HttpClient
  ) { }


  Login(username: string, password: string): Observable<any> {
    const hadata = {
      username: username,
      password: password
    }
    return this.http.post('http://45.77.184.244:8000/base/Login/', hadata)
      .map((res: any) => {

        const logind = res;
        return res.json();
      })
      .catch(error => {  swal(error.json().detail); return error; });

  }
  Logout(): Observable<any> {
    return this.htttp.get('http://45.77.184.244:8000/base/Logout/')
      .map(res => { return res; })
      .catch(error => error);

  }

  ForgetPasswordSendEmail(username: string, email: string): Observable<any> {
    const hadata = {
      username: username,
      email: email
    }

    //have to change url for sending emial
    return this.http.post('http://45.77.184.244:8000/base/reset_password/', hadata)
      .map((res: any) => {

        const logind = res;
        return res.json();
      })
      .catch(error => { swal(error.json().detail); return error; });

  }
  ForgetPasswordUpdate(password: string, email: string): Observable<any> {
    const hadata = {
      password: password,
      email: email
    }

    //have to change url for sending emial
    return this.http.post('http://45.77.184.244:8000/base/reset_password_confirm/', hadata)
      .map((res: any) => {

        const logind = res;
        return res.json();
      })
      .catch(error => { swal(error.json().detail); return error; });

  }

  Register(data): Observable<any> {

    return this.http.post('http://45.77.184.244:8000/base/Register/', data)
      .map(res => {
        return res.json();
      })

  }
  isLoggedIn(): boolean {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      return true;
    } else {
      return false;
    }

  }

  isAdmin(): boolean {
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.admin === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getUsername(): string {
    return JSON.parse(localStorage.getItem('user')).username;
  }

  shouldSendToSettings(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.is_verified == 0 && user.kyc_uploaded == 0) {
      return true;
    } else {
      return false;
    }
  }

  shouldSendToClientDash(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.is_verified == 0 && user.kyc_uploaded == 1) {
      return true;
    } else {
      return false;
    }
  }

  userIsLoggedIn() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  userIsAdmin() {
    return this.getAdminValue();
  }

  getToken() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')).token;
    } else {
      return false;
    }
  }

  getAdminValue() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')).admin || false;
    } else {
      return false;
    }
  }

}
