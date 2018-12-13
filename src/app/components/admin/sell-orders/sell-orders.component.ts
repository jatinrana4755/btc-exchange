import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';
import { OrderFilterPipe } from '../../../filters/orderBy.pipe';
import { PriceFilterPipe } from '../../../filters/price.pipe';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-orders',
  templateUrl: './sell-orders.component.html',
  styleUrls: ['./sell-orders.component.css']
})
export class SellOrdersComponent implements OnInit {
  orders: any;

  // used to implement filters
  coin_name: any;
  paymentMethods: any;
  selectedPaymentMethods: string;
  min: number;
  max: number;
  transNo: any;
  message: any;
  tranStatus: any;
  userId: any;
  p: number = 1; // for pagination
  currentDetail: any = {};
  status: any;
  loading: boolean;
  currentId: any;
  currentStatus: any;
  sellForm: FormGroup;
  selectedDetailsSave: any;
  wireInfo: any;
  fieldName: string;

  constructor(
    private ds: DataService,
    private ads: AdminDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.fetchSellOrders();
    this.getPaymentMethods();
    this.initForm();
  }



  editSellOrders(userId) {
    this.userId = userId;
  }

  showMessage(classany, ico) {
    const alertBox = document.getElementById('alert-message');
    const icon = document.getElementById('icon-alert');
    icon.classList.add(ico);
    alertBox.classList.add(classany);
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 4000);
  }

  fetchSellOrders() {
    // this.loading = true;
    this.ads.getSellOrders()
      .subscribe(orders => {
        // this.loading = false;
        this.orders = orders;
      }, err => {
        // this.loading = false;
      });
  }

  getPaymentMethods() {
    this.ds.getPaymentMethods().subscribe((res:any) => {
      this.paymentMethods = res.payment_method;
    });
  }

  onSubmit() {
    this.ads.putSellOrder(this.currentId, this.sellForm.value).subscribe(res => {
      this.fetchSellOrders();
      this.message = 'Successfully added';      
    }, error => {
      this.message = 'Something went wrong, Please try again';      
    });
  }


  initForm() {
    this.sellForm = this.fb.group({
      status: ['', [Validators.required]],
      transaction_no: ['']
    });
  }

  // called on click of row
  saveOrderDetails(e) {
    this.selectedDetailsSave = e;
    this.currentStatus = e.status;
    this.currentId = e.id;

    if (e.transaction_no) {
      this.wireInfo = JSON.parse(this.selectedDetailsSave.transaction_no);
      if (e.payment_name == 'Wire') {
        this.sellForm.addControl('transaction_no', new FormControl('', [Validators.required]));
        this.fieldName = 'Wire Reference Number'
      } else if (e.payment_name == 'Money Gram' || e.payment_name == 'Ria' || e.payment_name == 'Western Union') {
        this.fieldName = 'Money Control Number';
        this.sellForm.addControl('transaction_no', new FormControl('', [Validators.required]));
      } else {
        this.sellForm.removeControl('transaction_no');
      }
    }
  }
}
