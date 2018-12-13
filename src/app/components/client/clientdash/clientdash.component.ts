import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-clientdash',
  templateUrl: './clientdash.component.html',
  styleUrls: ['./clientdash.component.css']
})
export class ClientdashComponent implements OnInit {
  initials: any;
  errMess: string;
  constructor(private auth: AuthService, private router: Router) { }

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
        // swal('Logged Out Successfully');
        this.router.navigateByUrl('/login');
      },
      errmess => {
      this.errMess = <any>errmess; localStorage.removeItem('user');
        // swal('Logged Out Successfully');
        this.router.navigateByUrl('/login');
      }
      );

  }

}
