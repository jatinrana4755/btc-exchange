import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-payment-address',
  templateUrl: './payment-address.component.html',
  styleUrls: ['./payment-address.component.css']
})
export class PaymentAddressComponent implements OnInit {
  address: any;
  coin: any;
  id: any;
  message: any;
  details: any;
  // this.loading = fals boolean;
  constructor(
    private ds: DataService,
    private ads: AdminDataService
  ) { }

  ngOnInit() {
    this.fetchPaymentAddress();
  }

  fetchPaymentAddress() {
    // this.loading = true;
    this.ds.getPaymentAddresses()
      .subscribe(res => {
        // this.loading = false;
        this.details = res;
      }, err => {
        // this.loading = false;
      });
  }

  storeDetails = (detail) => {
    this.coin = detail.coin;
    this.address = detail.address;
    this.id = detail.id;
  }

  onSubmit = () => {
    this.ads.putPaymentAddress(this.address, this.coin, this.id).subscribe(res => {
      this.resetForm();
      this.fetchPaymentAddress();
      this.message = 'Payment Address Updated';
      this.ds.showMessage('alert-success', 'fa-check-circle');
    }, error => {
      this.message = `Error:${error}`;
      this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
      this.resetForm();
    });
  }

  resetForm() {
    this.address = null;
    this.coin = null;
  }
}
