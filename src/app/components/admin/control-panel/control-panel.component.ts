import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  details: any;
  id: any;
  buy_fee: any;
  message: any;
  sell_fee: any;
  coinDetail: any;
  // // loading: boolean;
  constructor(
    private ads: AdminDataService,
    private ds: DataService
  ) { }

  ngOnInit() {
    this.getDetails();
    // this.getCoinDetails();
  }

  getDetails = () => {
    // this.loading = true;
    this.ads.getCommisionFee().subscribe(res => {
      this.details = res;
      // this.loading = false;
    }, err => {
      // this.loading = false;
    });
  }

  storeDetails = (detail) => {
    this.buy_fee = detail.buy_fee;
    this.sell_fee = detail.sell_fee;
    this.id = detail.id;
  }

  onSubmit = () => {
    this.ads.putCommissionFee(this.buy_fee, this.sell_fee, this.id).subscribe(res => {
      this.message = 'Control Panel Updated';
      this.ds.showMessage('alert-success', 'fa-check-circle');
      this.getDetails();
    }, error => {
      this.message = `Error:${error}`;
      this.ds.showMessage('alert-danger', 'fa-exclamation-triangle');
    });
  }

}


