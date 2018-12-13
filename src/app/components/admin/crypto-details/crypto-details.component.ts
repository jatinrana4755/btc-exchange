import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminDataService } from './../../../services/admin-data.service';
import { DataService } from './../../../services/data.service';
declare var $: any;
@Component({
  selector: 'app-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent implements OnInit, AfterViewInit {
  WuDetails: any;
  cryptoObj = {};
  cryptoArr = [{ value: '', key: 'name' }, { value: '', key: 'details' }];
  cashArr = [{ value: '', key: 'name' }, { value: '', key: 'account' }];  
  disableRemoveWu = false;
  proofWu: any;

  wuDetails: any;
  mgDetails: any;
  wireDetails: any;
  riaDetails: any;
  keyArr: any = [];
  detailsObj: any = [];
  cryptoLoading: boolean;
  message: string;
  oldStatus: boolean;
  name: any;
  status: any;
  id: any;
  constructor(
    private ads: AdminDataService,
    private ds: DataService
  ) { }
  selectCryptoName: string;
  ngOnInit() {
    this.getCryptoDetails('WesternUnion');
  }

  ngAfterViewInit() {
    $('#myModal').on('hidden.bs.modal', function (e) {
      this.cryptoArr = [{ value: '', key: 'name' }, { value: '', key: 'details' }];
    });
  }


  selectCrypto(crypto) {
    this.selectCryptoName = crypto;
  }

  submitWu() {
    this.cryptoObj = {};
    this.cryptoArr.forEach((element, i) => {
      this.cryptoObj[element.key] = element.value;
    });
    this.ads.postWUDetails(JSON.stringify(this.cryptoObj), this.proofWu, this.selectCryptoName).subscribe(res => {
      this.cryptoArr = [{ value: '', key: 'name' }, { value: '', key: 'details' }];
      this.message = `${this.selectCryptoName} details added`;
      this.ds.showMessage('alert-success', 'fa-check-circle');
      this.getCryptoDetails(this.selectCryptoName)
    }, err => {
      this.message = `Error: ${err}`;
      this.ds.showMessage('alert-danger', 'fa-check-circle');
    });
    this.getCryptoDetails(this.selectCryptoName);

  }

  addWu() {
    this.cryptoArr.push({ value: '', key: '' });
  }

  removeWu(i) {
    if (this.cryptoArr.length > 1) {
      // this.disableRemoveWu = false;
      this.cryptoArr.splice(i, 1);
    } else {
      // this.disableRemoveWu = true;
    }
  }

  getCryptoDetails(name) {
    this.cryptoLoading = true;
    this.ads.getCryptoDetails(name).subscribe((res: any) => {
      this.cryptoLoading = false;
      this.wuDetails = res;
      res.forEach((element, i) => {
        this.detailsObj[i] = element.details;
        this.detailsObj[i] = JSON.parse(this.detailsObj[i]);
        console.log('nice',this.detailsObj[i])
        this.keyArr[i] = Object.keys(this.detailsObj[i]);
        console.log('keys',this.keyArr[i])
      });
    });
  }


  edit() {
    this.ads.editCryptodetails(this.name, this.status, this.id).subscribe(res => {
      this.message = 'Status Updated';
      this.ds.showMessage('alert-success', 'fa-check-circle');
    }, err => {
      this.message = `Error: ${err}`;
      this.ds.showMessage('alert-danger', 'fa-check-circle');
    });
  }


  editSave(name, status, id) {
    this.name = name;
    this.status = status;
    this.id = id;
  }

}
