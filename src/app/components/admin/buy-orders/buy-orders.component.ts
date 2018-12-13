import { Component, OnInit, } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';
import { OrderFilterPipe } from '../../../filters/orderBy.pipe';
import { PriceFilterPipe } from '../../../filters/price.pipe';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-buy-orders',
  templateUrl: './buy-orders.component.html',
  styleUrls: ['./buy-orders.component.css']
})
export class BuyOrdersComponent implements OnInit {
  details: any = [];
  detailsCopy: any = [];
  p: number = 1; // for pagination
  // used to implement filters
  paymentMethods: any;
  status: any;
  // loading: boolean;
  currentId: any;
  currentStatus: any;
  selectedBuyOrder: any;
  uploadBuyTrNoForm: FormGroup;
  currentPayment: string;
  WuDetails: any;
  statusDisabled = false; // it stores if 'status' field should be shown to users or not
  currentStatusCode: any;
  keyArr;
  detailsObj;
  wuLoading = false;
  constructor(
    private ds: DataService,
    private ads: AdminDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getDetails();
    this.getPaymentMethods();
    this.initForm();
  }

  getDetails = () => {
    // // // this.loading = true;
    this.ads.getBuyOrders().subscribe(res => {
      // this.loading = false;
      this.details = res;
      this.detailsCopy = res;
    }, err => {
      // this.loading = false;
    });
  }

  getPaymentMethods() {
    this.ds.getPaymentMethods().subscribe((res: any) => {
      this.paymentMethods = res.payment_method;
    });
  }


  onSubmit() {
    this.ads.putBuyOrders(this.uploadBuyTrNoForm.value, this.currentId).subscribe(res => {
      this.getDetails();
      // this.message = 'Updated Successfully';
    }, error => {
      // this.message = 'Something went wrong, Please try again';
    });
  }

  initForm() {
    this.uploadBuyTrNoForm = this.fb.group({
      // status: ['', [disabled: true]],
      status: new FormControl({ value: '', disabled: this.statusDisabled }, Validators.required),
    });
  }
  // when a row is clicked, the details are saved in a var
  // remove transation field if not paynear me 
  // remove all edit options if status = -1 and method is wes union, ria, money gram
  saveBuyOrder(detail) {
    this.selectedBuyOrder = detail;
    this.currentId = detail.id;
    this.currentStatus = detail.status;
    this.currentPayment = detail.payment_name;
    // no editing details is allowed in this case
    if (this.currentStatus == -1 && (this.currentPayment == 'Western Union' || this.currentPayment == 'Ria' || this.currentPayment == 'Money Gram' || this.currentPayment == 'Wire' || this.currentPayment == 'Cash Deposit')) {
      this.uploadBuyTrNoForm.removeControl('status');
      this.statusDisabled = true;
    } else if ((this.currentPayment == 'PaynearMe')) {
      this.uploadBuyTrNoForm.addControl('status', new FormControl('', [Validators.required]));
    } else {
      this.uploadBuyTrNoForm.addControl('status', new FormControl('', [Validators.required]));
    }

    // remove transaction_no field if payment is not through paynear me 
    if (this.selectedBuyOrder.payment_name == 'PaynearMe') {
      this.uploadBuyTrNoForm.addControl('transaction_no', new FormControl('', [Validators.required]));
    } else {
      this.uploadBuyTrNoForm.removeControl('transaction_no');
    }
    if (this.currentPayment == 'Western Union' || this.currentPayment == 'Money Gram' || this.currentPayment == 'Ria' || this.currentPayment == 'Wire') {
      this.getWuDetails(this.currentId, this.currentPayment);
    } else {
       this.wuLoading = false;
      this.WuDetails = null;
    }

  }

  // it is called on keyup of transaction no (case only in paynear me )
  changeStatus(e) {
    if (e != '') {
      if (this.selectedBuyOrder.status == -1) {
        this.currentStatus = 0;
      } else if (this.selectedBuyOrder.status == 0) {
        this.currentStatus = 1;
      }
    } else if (e == '') {
      // transaction no is not entered (or deleted after entering) than the status should be in its original status
      if (this.selectedBuyOrder.status == -1) {
        this.currentStatus = -1;
      } else if (this.selectedBuyOrder.status == 0) {
        this.currentStatus = 0;
      } else {
        this.statusDisabled = true;
      }

    }
  }

  getWuDetails(id, paymentName) {
    this.wuLoading = true;
    this.ds.getWuDetails(id, paymentName).subscribe((res: any) => {
      this.wuLoading = false;
      this.WuDetails = res;
      this.detailsObj = res.details;
      const keyArr = Object.keys;
      this.detailsObj = JSON.parse(this.detailsObj);
      this.keyArr = Object.keys(this.detailsObj);
      // this.keyArr.forEach(element => {
      // });
    });
  }

}
