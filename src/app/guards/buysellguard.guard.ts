import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class BuysellguardGuard implements CanActivate {
  constructor( private auth: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.shouldSendToSettings()){
        swal('Upload KYC first to use buy sell feature!!');
        this.router.navigateByUrl('clientdash/settings');
       
      }
      else if(this.auth.shouldSendToClientDash()){
        swal('Your KYC Verification is under Process!!');
        this.router.navigateByUrl('clientdash/dashcontent');
      }
      else{
        return true;
      }
    
  }
}
