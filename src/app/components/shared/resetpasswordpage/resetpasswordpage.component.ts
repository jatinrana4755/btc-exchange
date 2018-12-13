import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';
import { Params, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetpasswordpage',
  templateUrl: './resetpasswordpage.component.html',
  styleUrls: ['./resetpasswordpage.component.css']
})
export class ResetpasswordpageComponent implements OnInit {

  constructor(public auth: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }
  email: string;
  password: string;
  confirmPassword: string;
  confirmRes: any;
  ngOnInit() {
    this.email = this.activatedRoute.snapshot.params.email;
  }


  onSubmit() {
    this.auth.ForgetPasswordUpdate(this.password, this.email).subscribe(res => {
      this.confirmRes = res;
      swal(res);
      this.router.navigateByUrl('/login');
      this.resetForm();
    }, error => {
      this.resetForm();
    });

  }

  resetForm() {
    this.password = null;
    this.confirmPassword = null;
  }
}
