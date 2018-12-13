import { Component, OnInit, NgModule, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user';
import swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../assets/css/package.min.css']
})
export class LoginComponent implements OnInit {
  public loading: boolean;
  newUserForm: FormGroup;
  constructor(private router: Router, private http: HttpClient, private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    // check if user already logged in, if true then navigate to appropraiate place
    if ((this.auth.userIsLoggedIn()) && (this.auth.isAdmin())) {
      this.router.navigate(['admindash']);
    } else if ((this.auth.userIsLoggedIn()) && (!(this.auth.isAdmin()))) {
      this.router.navigate(['clientdash']);
    }

    this.initRegisterUserForm();
  }

  fileToUpload: File = null;
  url: any;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.url = this.fileToUpload;
  }
  files2: FileList;
  onChangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.files2 = event.target.files;
      this.fileToUpload = this.files2.item(0);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        //this.url = event.target.result; //this is invalid
        this.url = reader.result; //this is valid
      }
    }
  }

  //login content
  username: string;
  password: string;
  loginResponse: User;
  submitting: boolean;
  errMess: string;
  loginUser() {
    this.submitting = true;
    this.loading = true;

    this.auth.Login(this.username, this.password)
      .subscribe(loginres => {
        this.submitting = false;
        this.loading = false


        //do extra actions on received data
        this.loginResponse = loginres;
        localStorage.setItem('user', JSON.stringify(loginres));
        //this.contentManager=this.auth.isContentManager();
        if (this.loginResponse.admin == false) {
          this.router.navigateByUrl('/clientdash');
        } else {
          this.router.navigateByUrl('/admindash');
        }

        //after successfull login navigate to dashboard
      },
      errmess => { this.errMess = <any>errmess; this.submitting = false; this.loading = false; }
      );

  }

  //register content starts

  registerResponse: any;
  registerID_Proof: File;
  responseByUser: any;
  registerConfirmPassword: any;
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
outOfPasswordField:boolean;
outOfEmailField: boolean;
  initRegisterUserForm() {
    this.newUserForm = this.fb.group({
      registerUsername: ['', Validators.required],
      registerPassword: ['', [Validators.required, Validators.minLength(8)]],
      registerName: ['', Validators.required],
      registerMobile: ['', Validators.required],
      registerEmail: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      registerAddress: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.comparePassword()) {
      this.loading = true;
      const formData = new FormData();
      formData.append('username', this.newUserForm.value['registerUsername']);
      formData.append('password', this.newUserForm.value['registerPassword']);
      formData.append('name', this.newUserForm.value['registerName']);
      formData.append('mobile', this.newUserForm.value['registerMobile']);
      formData.append('id_proof', this.fileToUpload);
      formData.append('address', this.newUserForm.value['registerAddress']);
      formData.append('email', this.newUserForm.value['registerEmail']);
      formData.append('captcha', this.responseByUser);
      this.submitRegisterForm(formData);
    }
  }

  submitRegisterForm(data) {
    this.auth.Register(data).subscribe(loginres => {
      this.submitting = false;
      this.loading = false;

      this.registerResponse = loginres;
      swal('You have registered Successfully, Login to Continue!');
      this.router.navigateByUrl('/login');
    },
      errmess => {
        this.submitting = false;
      this.loading = false;
        swal(errmess._body);
      }
    );
  }
  resolved(captchaResponse: string) {
    this.responseByUser = captchaResponse;
  }

  comparePassword(): boolean {
    if (this.newUserForm.value['registerPassword'] == this.registerConfirmPassword) {
      return true;
    } else {
      swal('Please enter a matching password');
      this.registerConfirmPassword = '';
      return false;
    }
  }
  forgetUsername: string;
  forgetEmail: string;
  sendEmailResponse: any;
  ForgetPassword() {
    this.auth.ForgetPasswordSendEmail(this.forgetUsername, this.forgetEmail)
      .subscribe(res => {
        this.sendEmailResponse = res;
      },
      errmess => {
        this.errMess = <any>errmess; this.submitting = false;
        swal(errmess.json().detail);
        swal(this.errMess);
      }
      );

  }
  //for showing active class on signIN Active
  signInActive: boolean = true;
  SignInAvtive() {
    this.signInActive = true;
  }
  SignUpActive() {
    this.signInActive = false;
  }


get Password() { return this.newUserForm.get('registerPassword'); }
get userName() { return this.newUserForm.get('registerUsername'); }
get name() { return this.newUserForm.get('registerName'); }
get mobile() { return this.newUserForm.get('registerMobile'); }
get address() { return this.newUserForm.get('registerAddress'); }
get email() { return this.newUserForm.get('registerEmail'); }

}
