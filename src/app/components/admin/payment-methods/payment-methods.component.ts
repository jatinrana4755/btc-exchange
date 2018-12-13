import { Component, OnInit} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit{
  methods: any;
  message: any;
  statusAdd: any = true;
  statusEdit: any;
  methodTitle: any;
  userId: any;
  newMethod: any;
  newStatus: any;
  buymethod:any;
  sellmethod:any;
  buymethodEdit:any;
  sellmethodEdit:any
  loading: boolean;
  paymentMethodData:any;
  constructor(
    private ds: DataService,
    private ads: AdminDataService
  ) { }
  ngOnInit() {
    this.getPaymentMethods();
  }

  postPaymentMethod() {
    this.paymentMethodData = {
            title: this.newMethod,
            status: this.newStatus,
            buymethod: this.buymethod,
            sellmethod: this.sellmethod
        };
    if (this.newMethod) {
      this.ads.postPaymentMethod(this.paymentMethodData)
      .subscribe(res => {
        this.getPaymentMethods();
        this.newMethod = null;
        this.newStatus = null;
        this.buymethod = null;
        this.sellmethod = null;
        this.message = 'Payment Address Added';
        this.ds.showMessage('alert-success', 'fa-check-circle');
      }, error => {
        this.message = `Error:${error}`;
        this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
      });
    } else { this.message = 'Enter Method Name';
    this.ds.showMessage('alert-danger', 'fa-exclamation-triangle'); }
  }

  onSubmit() {
    this.ads.putPaymentMethod(this.methodTitle, this.statusEdit, this.userId, this.buymethodEdit, this.sellmethodEdit)
      .subscribe(res => {
        this.getPaymentMethods();
        this.message = 'Payment Address Updated';
        this.ds.showMessage('alert-success', 'fa-check-circle');
      }, error => {
        this.message = `Error:${error}`;
        this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
      });
  }

  editMethod(method) {
    this.methodTitle = method.title;
    this.statusEdit = method.is_active;
    this.sellmethodEdit = method.sellmethod;
    this.buymethodEdit = method.buymethod;
    this.userId = method.id;
  }

  getPaymentMethods() {
    // this.loading = true;
    this.ds.getPaymentMethods()
      .subscribe((methods: any) => {
        // this.loading = false;
        this.methods = methods.payment_method;
      }, err => {
        // this.loading = false;
      });
  }

}


