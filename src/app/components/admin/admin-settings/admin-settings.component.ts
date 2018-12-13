import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  message: any;
  constructor(private ds: DataService,
    private ads: AdminDataService,
  ) { }
  // message: string;
  new_password: string;
  old_password: string;
  time: number;
  name: string;
  address: string;
  country: string;
  // details: [
  //   { 'name': '', 'address': '', 'city': '', 'original address': ''}
  // ];
  details: any;
  proofWu: any;
  proofMg: any;
  proofWire: any;
  proofRia: any;

  WuDetails: any;
  id: any;

  cryptoObj = {};

  wuArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  mgArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  wireArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  riaArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  disableRemoveWu = false;
  disableRemoveWire = false;
  disableRemoveMg = false;
  disableRemoveRia = false;


  ngOnInit() {
  }

  onSubmit() {
    if (this.old_password === this.new_password) {
      this.resetForm();
      this.message = 'New Password is same as old Password';
      this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
    } else {
      this.ds.changePasswordRequest(this.old_password, this.new_password).subscribe(res => {
        this.resetForm();
        this.message = 'Password Changed';
        this.ds.showMessage('alert-success', 'fa-check-circle');
      }, error => {
        this.message = `Error: ${error}`;
        this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
      });
    }
  }

  resetForm() {
    this.old_password = null;
    this.new_password = null;
  }

  submitTimeChange() {
    const data = {
      'time': this.time
    };
    this.ads.putTime(data).subscribe(res => {
      this.message = 'Time Interval  Changed';
      this.ds.showMessage('alert-success', 'fa-check-circle');
    }, err => {
      this.message = `Error: ${err}`;
      this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
    });
  }

  // submitWu() {
  //   this.cryptoObj = {};
  //   this.wuArr.forEach((element, i) => {
  //     this.cryptoObj[element.key] = element.value;
  //   });
  //   this.ads.postWUDetails(JSON.stringify(this.cryptoObj), this.proofWu).subscribe(res => {
  //     this.wuArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  //   });

  // }

  // submitRia() {
  //   this.cryptoObj = {};
  //   this.riaArr.forEach((element, i) => {
  //     this.cryptoObj[element.key] = element.value;
  //   });
  //   this.ads.postRiaDetails(JSON.stringify(this.cryptoObj), this.proofRia).subscribe(res => {
  //     this.riaArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  //   });

  // }

  // submitMg() {
  //   this.mgArr.forEach((element, i) => {
  //     this.cryptoObj[element.key] = element.value;
  //   });
  //   this.ads.postMgDetails(JSON.stringify(this.cryptoObj), this.proofMg).subscribe(res => {
  //     this.mgArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  //   });

  // }

  // submitWire() {
  //   this.wireArr.forEach((element, i) => {
  //     this.cryptoObj[element.key] = element.value;
  //   });
  //   this.ads.postWireDetails(JSON.stringify(this.cryptoObj), this.proofWire).subscribe(res => {
  //     this.wireArr = [{ value: '', key: 'name' }, { value: '', key: 'country' }];
  //   });

  // }

  // addWu() {
  //   this.wuArr.push({ value: '', key: '' });
  // }

  // addWire() {
  //   this.wireArr.push({ value: '', key: '' });
  // }

  // addMg() {
  //   this.mgArr.push({ value: '', key: '' });
  // }

  // addRia() {
  //   this.riaArr.push({ value: '', key: '' });
  // }

  // removeWu(i) {
  //   if (this.wuArr.length > 1) {
  //     this.disableRemoveWu = false;
  //     this.wuArr.splice(i, 1);
  //   } else {
  //     this.disableRemoveWu = true;
  //   }
  // }

  // removeMg(i) {
  //   if (this.mgArr.length > 1) {
  //     this.disableRemoveMg = false;
  //     this.mgArr.splice(i, 1);
  //   } else {
  //     this.disableRemoveMg = true;
  //   }
  // }

  // removeWire(i) {
  //   if (this.wireArr.length > 1) {
  //     this.disableRemoveWire = false;
  //     this.wireArr.splice(i, 1);
  //   } else {
  //     this.disableRemoveWire = true;
  //   }
  // }

  // removeRia(i) {
  //   if (this.riaArr.length > 1) {
  //     this.disableRemoveRia = false;
  //     this.riaArr.splice(i, 1);
  //   } else {
  //     this.disableRemoveRia = true;
  //   }
  // }

}
