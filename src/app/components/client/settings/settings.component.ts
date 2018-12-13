import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgForm, FormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private ds: DataService,
  ) { }
  // message: string;
  new_password: string;
  old_password: string;
  
  ngOnInit() {
  }

  onSubmit() {
    this.ds.changePasswordRequest(this.old_password, this.new_password).subscribe(res => {
      this.resetForm();
    }, error => {
      this.resetForm();
    });

  }

  resetForm() {
    this.old_password = null;
    this.new_password = null;
  }
uploadRes:any;
errMess:string;
fileToUpload:File=null;
handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}

  uploadKYC(){
    swal('image url name '+this.fileToUpload.name);
    this.ds.UploadKYC(this.fileToUpload)
    .subscribe(uploadres => {
        this.uploadRes = uploadres;
        swal('KYC Uploaded Successfully');
      },
      errmess => { this.errMess = <any>errmess; }
      );
  }
}
