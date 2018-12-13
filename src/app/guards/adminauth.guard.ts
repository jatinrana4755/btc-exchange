import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminauthGuard implements CanActivate {
  constructor( private auth: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isAdmin()){
        return true;
      }
      else{
        swal('Login First with Admin Credentials to Access this!!');
        this.router.navigateByUrl('/login');
      }
    
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isAdmin()){
        return true;
      }
      else{
        swal('Login First with Admin Credentials to Access this!!');
        this.router.navigateByUrl('/login');
      }
    
  }
}
