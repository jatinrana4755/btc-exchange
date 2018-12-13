import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  errMess: string;
  @ViewChild('userLogo') userLogo: ElementRef;
  initials: any;
  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.username();
  }

  username() {
    const user = this.auth.getUsername();
    const ini = user.substring(0, 1);
    this.initials = ini;
  }

  Logout() {
    this.auth.Logout()
      .subscribe(res => {
        localStorage.removeItem('user');
        swal('Logged Out Successfully');
        this.router.navigateByUrl('/login');
      },
      errmess => {
      this.errMess = <any>errmess; localStorage.removeItem('user');
        swal('Logged Out Successfully');
        this.router.navigateByUrl('/login');
      }
      );

  }
}

