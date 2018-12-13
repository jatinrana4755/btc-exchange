import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  details: any;
  id: any;
  message: any;
  p: number = 1; // for pagination
  imageUrl:any;
  loading: boolean;

  constructor(
    private ds: DataService,
    private ads: AdminDataService    
  ) { }
  ngOnInit() {
    this.getDetails();
  }

  getDetails = () => {
    // this.loading = true;
    this.ads.getKYC().subscribe(res => {
      // this.loading = false;
      this.details = res;
    });
  }

  changeStatus(id, is_verified) {
    if (is_verified == 1) {
      is_verified = 0;
    } else {
      is_verified = 1;
    }
    this.ads.putKYC(is_verified, id).subscribe(res => {
      this.message = 'Status Updated';
      this.ds.showMessage('alert-success', 'fa-check-circle');
      this.getDetails();
    });
  }

saveImageUrl(id_proof){
  this.imageUrl = id_proof;
}

}
