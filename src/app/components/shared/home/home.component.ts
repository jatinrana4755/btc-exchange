import { Component, OnInit } from '@angular/core';
import '../../../../assets/js/custom.js';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../../assets/css/package.min.css']
})
export class HomeComponent implements OnInit {
admin: boolean;
loggedIn: boolean;
name: string;
  constructor( 
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() { 
    if ((this.authservice.userIsLoggedIn()) && (this.authservice.isAdmin())) {
      this.admin = true;
      this.loggedIn = true;
      // this.name = this.authservice.getUsername();
          // this.router.navigateByUrl('/admindash');
    } else if ((this.authservice.userIsLoggedIn()) && (!(this.authservice.isAdmin())) ){  
      this.admin = false;
      this.loggedIn = true;
      // this.name = this.authservice.getUsername();
          // this.router.navigateByUrl('/clientdash');
    }
  }
}
