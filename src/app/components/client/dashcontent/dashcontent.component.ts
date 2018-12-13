import { Component, OnInit } from '@angular/core';
import { CoinDetail } from '../../../shared/coindetail';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { UserBuy } from '../../../shared/userbuy';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { SearchByDatePipe } from '../../../filters/search-by-date.pipe';
import { Jsonp } from '@angular/http';

import { SortPipe } from './../../../filters/sort.pipe';
@Component({
  selector: 'app-dashcontent',
  templateUrl: './dashcontent.component.html',
  styleUrls: ['./dashcontent.component.css']
})
export class DashcontentComponent implements OnInit {
  date_to_compare:string; //for sending parameter in date pipe
  date_to_compare_sell:string;// for sending date parameter in sell pipe
  CoinDetails: CoinDetail[];
  CoinDetail: CoinDetail;
  BtcCoin: CoinDetail;
  EthCoin: CoinDetail;
  BtcShow: boolean = true;
  BtnShow: boolean = true;
  UserBuyResponse: any;
  UserSellResponse: any;
  coindetailError: string = "";
  loadingRecent = true;
  loadingBuy = true;
  loadingSell = true;
  p = 1; // for pagination for buy
  q = 1; // for pagination for sell
  field: any; // for sorting
  orderBy: any = false;
  fieldSell: any;
  constructor(private data: DataService, private auth: AuthService, private fb: FormBuilder) { }
  ngOnInit() {
    this.initializeUploadBuyTrForm();
    this.data.Coindetail("BTC")
      .subscribe(res => {
        //do extra actions on received data
        this.BtcCoin = res;
        this.CoinDetail = this.BtcCoin;
        this.loadingRecent = false;
      },
      errmess => { this.coindetailError = <any>errmess; });
    this.BtcShowFun();
    this.data.Coindetail("ETH")
      .subscribe(res => {
        //do extra actions on received data
        this.EthCoin = res;
        this.loadingRecent = false;
      },
      errmess => { this.coindetailError = <any>errmess; });

    this.data.UserBuy(this.auth.getUsername())
      .subscribe(res => {
        //do extra actions on received data
        this.UserBuyResponse = res;
        this.changeBuyOrdersTransactionNoForAchToJsonObject();
        this.loadingBuy = false;
      },
      errmess => { this.coindetailError = <any>errmess; });

    this.data.UserSell(this.auth.getUsername())
      .subscribe(res => {
        //do extra actions on received data
        this.UserSellResponse = res;
        this.changeSellOrdersTransactionNoForWireToJsonObject();
        this.loadingSell = false;
      },
      errmess => { this.coindetailError = <any>errmess; });
      
    this.loadContentAgain();
    
  }
  // btnShow(){
  //   this.BtnShow = true;
  // }

  // btnSwitch(){
  //   this.BtnShow = false;
  // }
  tr_no: string;
  editTransaction(id, tr_no, i) {

    this.data.UpdateUserBuyTrNo(id, tr_no)
      .subscribe(res => {
        //do extra actions on received data
        this.UserBuyResponse[i].transaction_no = res.transaction_no;
      },
      errmess => { this.coindetailError = <any>errmess; });
  }
  EtherCoinDetails() {
    this.data.Coindetail("ETH")
      .subscribe(res => {
        //do extra actions on received data
        this.EthCoin = res;
      },
      errmess => { this.coindetailError = <any>errmess; });
  }

  BitcoinCoinDetails() {
    this.data.Coindetail("BTC")
      .subscribe(res => {
        //do extra actions on received data
        this.BtcCoin = res;
      },
      errmess => { this.coindetailError = <any>errmess; });
  }

  BtcShowFun() {
    this.CoinDetail = this.BtcCoin;
    this.BtcShow = true;
  }
  EthShowFun() {
    this.CoinDetail = this.EthCoin;
    this.BtcShow = false;
  }


  loadContentAgain() {
    setTimeout(() => {
      this.BitcoinCoinDetails();
      this.EtherCoinDetails();
      this.loadContentAgain();
      //alert('loading content again ')
    }, 10000);
  }

  ModelContent: UserBuy;
  WireSellTrNoUpdateModal(i: number) {
    this.ModelContent = this.UserSellResponse[i];
  }
  ViewContent:any;
  trNo:any;
  WireSellTrNoViewModal(i:number){
    this.ViewContent=this.UserSellResponse[i].transaction_no;
    this.trNo=JSON.parse(this.ViewContent);
  }
  sellTrName: string;
  sellTrAddress: string;
  sellTrBank: string;
  sellTrBankName: string;
  sellTrBankRouting: string;
  sellTrNumber: string;
  sellTrBankAddress: string;
  sellTrBankSwiftCode: string;
  sellTrUpdateResponse: any;

  UpdateSellWireTrNo() {
    var data = JSON.stringify({
      name: this.sellTrName,
      address: this.sellTrAddress,
      bankName: this.sellTrBankName,
      bankBankRouting: this.sellTrBankRouting,
      number: this.sellTrNumber,
      bankAddress: this.sellTrBankAddress,
      bankSwiftCode: this.sellTrBankSwiftCode
    });
    alert('inside function ');
    //,this.sellTrName,this.sellTrAddress,this.sellTrBankName,
    //this.sellTrBankRouting,this.sellTrNumber,this.sellTrBankAddress,this.sellTrBankSwiftCode
    this.data.UpdateUserSellTrNoForWire(this.ModelContent.id, this.sellTrName, this.sellTrAddress, this.sellTrBankName,
      this.sellTrBankRouting, this.sellTrNumber, this.sellTrBankAddress, this.sellTrBankSwiftCode)
      .subscribe(res => {
        //do extra actions on received data
        alert(res);
        this.sellTrUpdateResponse = res;
      },
      errmess => { this.coindetailError = <any>errmess; });
  }
  //function to check whether a str is json parsable or not
  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
  //function for converting json string to json object for sell Orders
  changeSellOrdersTransactionNoForWireToJsonObject(){
    for(let i=0; i<this.UserSellResponse.length; i++){
      if(this.UserSellResponse[i].payment=='Wire'){
        if(this.IsJsonString(this.UserSellResponse[i].transaction_no))
        this.UserSellResponse[i].transaction_no = JSON.parse(this.UserSellResponse[i].transaction_no);
      }
    } 
  }
  changeBuyOrdersTransactionNoForAchToJsonObject(){
    for(let i=0; i<this.UserBuyResponse.length; i++){
      if(this.UserBuyResponse[i].payment=='ACH'){
        if(this.IsJsonString(this.UserBuyResponse[i].transaction_no))
        this.UserBuyResponse[i].transaction_no = JSON.parse(this.UserBuyResponse[i].transaction_no);
      }
    } 
  }

  //function for showing buy order status screen and upload transaction no
  showBuyOrderStatusResponse:any;
  buyPaymentTitle:string;
  achInfo:any;
  BuyOrderDetails(buyorder){
    this.showBuyOrderStatusResponse=buyorder;
    this.buyPaymentTitle=this.showBuyOrderStatusResponse.payment;
      if(this.buyPaymentTitle == 'ACH'){
      this.achInfo=this.showBuyOrderStatusResponse.transaction_no;
    }
  }
  uploadBuyTrNoForm:FormGroup;
  initializeUploadBuyTrForm(){
    this.uploadBuyTrNoForm = this.fb.group({
      transaction_no: ['', [Validators.required]]
    });
  }
  get transaction_noWire() { return this.uploadBuyTrNoForm.get('transaction_no'); }
  trNoBoolean:boolean=false;
  trNoUploadResponse:any;
  UploadTransactionNumberForWURiaMoney(){
    this.trNoBoolean=true;
    if(this.uploadBuyTrNoForm.valid){
      const data={
        transaction_no:this.uploadBuyTrNoForm.get('transaction_no').value,
        status:0
      }
      this.data.UpdateUserBuyTrNoForWURiaMoneyGram(this.showBuyOrderStatusResponse.id,data)
      .subscribe(res => {
        this.trNoUploadResponse=res;
        this.showBuyOrderStatusResponse.status=0;
        this.trNoBoolean = false;
      },
      errmess => { swal(errmess.statusText); this.trNoBoolean = false; });
    }
  }

  //function for showing sell order status screen and upload transaction no
  showSellOrderStatusResponse:any;
  sellPaymentTitle:string;
  wireInfo:any;
  SellOrderDetails(sellorder){
    this.showSellOrderStatusResponse=sellorder;
    this.sellPaymentTitle=this.showSellOrderStatusResponse.payment;
    //alert(this.sellPaymentTitle);
      if(this.sellPaymentTitle == 'Wire'){
      this.wireInfo=this.showSellOrderStatusResponse.transaction_no;
    }
  }

   UploadReceipt(){
    this.data.postReceipt(this.fileToUpload, this.showBuyOrderStatusResponse.id).subscribe(res => {
      swal('Cash Deposit Receipt added successfully')

    });
  }
fileToUpload:any;

  handlefileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  }

}
