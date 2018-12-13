import { Component, OnInit } from '@angular/core';
import { CoinDetail } from '../../../shared/coindetail';
import { DataService } from '../../../services/data.service';
import { PaymentMethod } from '../../../shared/paymentmethod';
import { PaymentAddress } from '../../../shared/paymentAddress';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent implements OnInit {
  PaymentMethods: PaymentMethod[];
  sellPaymentMethod: PaymentMethod[] = [];
  buyPaymentMethod: PaymentMethod[] = [];
  PaymentAddresses: PaymentAddress[];
  errMessage: string;
  paymentCurrencySelected: string;
  paymentCurrencySelectedValue: number;
  btcCoinDetail: CoinDetail;
  ethCoinDetail: CoinDetail;
  coindetailError: string;
  showBuyDetails: boolean = false;
  showSellDetails: boolean = false;
  buyPaymentMethodSelected: PaymentMethod;
  buyPaymentTitle: string;
  activesell: boolean;
  activebuy: boolean;
  sellPaymentCurrencySelectedValue: number;
  sellPaymentMethodSelected: number;
  wuDetails: any;
  cryptoDetails: any;
  wuId: any;
  wireId: any;
  riaId: any;
  mgId: any;
  cashId: any;
  wuResponse: any;
  coinAddress = 'Payment Address';
  coinAddressBtc: any;
  coinAddressEth: any;
  payment_name: any;
  currency = [
    { 'id': 1, 'name': 'Bitcoin' },
    { 'id': 2, 'name': 'Ethereum' }
  ];

  buyForm: FormGroup;

  sellForm: FormGroup;
  currencySelected: string;
  sellCurrencySelected: string;
  buyFormConfirm = false; // true when buy form confirm button is clicked
  sellFormConfirm = false; // true when sell form confirm button is clicked

  constructor(private data: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.initSellForm();
    this.initializeTestForm();
    this.initializeAchBuyForm();
    this.initializeWireSellForm();
    this.initializeUploadBuyTrForm();
    this.data.getPaymentMethods()
      .subscribe((res: any) => {
        this.PaymentMethods = res.payment_method;
        this.cryptoDetails = res.details;
        this.saveIds();
        this.PaymentMethods.forEach(element => {
          if (element.buymethod) {
            this.buyPaymentMethod.push(element);
          }
          if (element.sellmethod) {
            this.sellPaymentMethod.push(element);
          }
        });
      },
      errmess => { this.errMessage = <any>errmess; });

    this.data.getPaymentAddresses()
      .subscribe(res => {
        res.forEach(element => {
          if (element.coin == 'ETH') {
            this.coinAddressEth = element.address;
          } else {
            this.coinAddressBtc = element.address;
          }
        });
        this.PaymentAddresses = res;
      },
      errmess => { this.errMessage = <any>errmess; });

    this.data.Coindetail('BTC')
      .subscribe(res => {
        this.btcCoinDetail = res;

      },
      errmess => { this.coindetailError = <any>errmess; });

    this.data.Coindetail('ETH')
      .subscribe(res => {
        this.ethCoinDetail = res;
      },
      errmess => { this.coindetailError = <any>errmess; });
  }



  activeBuy() {
    this.activebuy = true;
    this.showBuyOrderStatus = false;
    this.activesell = false;
  }


  activeSell() {
    this.activebuy = false;
    this.showSellOrderStatus = false;
    this.activesell = true;
  }


  // buy form function goes here

  // initialize form 
  initForm = () => {
    this.buyForm = this.fb.group({
      address: [''],
      amount: ['', [Validators.required, Validators.pattern(this.positive), this.decimalValidator]],
      coin: ['', [Validators.required]],
      fee: [''],
      fee_ammount: ['', [Validators.required, Validators.pattern(this.positive), this.decimalValidator]],
      payment: ['', [Validators.required]]
    });
  }

  // currencyChange is called when some currency is selected.
  currencyChange(e) {
    this.paymentCurrencySelectedValue = 0;
    if (e.target.value == 1) {
      this.currencySelected = 'Bitcoin';
      this.paymentCurrencySelectedValue = this.btcCoinDetail.buy_price;
      this.changeAmountOfCurrency(this.fee_ammount.value);
      this.coinAddress = this.coinAddressBtc;
    } else if (e.target.value == 2) {
      this.currencySelected = 'Ethereum';
      this.paymentCurrencySelectedValue = this.ethCoinDetail.buy_price;
      this.changeAmountOfCurrency(this.fee_ammount.value);
      this.coinAddress = this.coinAddressEth;
    }
  }

  // changeAmountOfCurrency is called when total amount is entered.
  changeAmountOfCurrency(e) {
    const currencyAmount = e / this.paymentCurrencySelectedValue;
    this.buyForm.controls['amount'].patchValue(currencyAmount);
  }

  // changeTotalAmount is called when amount of currency is entered.
  changeTotalAmount(e) {
    const totalAmount = e * this.paymentCurrencySelectedValue;
    this.buyForm.controls['fee_ammount'].patchValue(totalAmount);
  }

  get address() { return this.buyForm.get('address'); }
  get amount() { return this.buyForm.get('amount'); }
  get coin() { return this.buyForm.get('coin'); }
  get fee_ammount() { return this.buyForm.get('fee_ammount'); }
  get fee() { return this.buyForm.get('fee') }
  get payment() { return this.buyForm.get('payment'); }

  buyNow() {
    this.buyFormConfirm = true;
    console.log(JSON.stringify(this.buyForm.get('amount').value), "knkjnk")
    if (this.buyForm.valid) {
      this.showBuyDetails = true;
    }
  }

  showBuyOrderStatus: boolean = false;
  showBuyOrderStatusResponse: any;
  achInfo: any;
  achBuyFormConfirm: boolean = false;
  ConfirmBuy() {
    this.achBuyFormConfirm = true;
    this.buyForm.controls['fee'].patchValue(this.paymentCurrencySelectedValue);
    if (this.buyPaymentTitle == 'ACH') {

      if (this.achBuyForm.valid) {

        //run second function in service to update form
        var achFormData = JSON.stringify({
          achName: this.achBuyForm.get('achName').value,
          achRoutingNumber: this.achBuyForm.get('achRoutingNumber').value,
          achBankName: this.achBuyForm.get('achBankName').value,
          achAccountNumber: this.achBuyForm.get('achAccountNumber').value,
          transaction_no: ''
        });
        const achData = {
          'address': this.coinAddress,
          'amount': this.buyForm.get('amount').value,
          'coin': this.buyForm.get('coin').value,
          'fee': this.buyForm.get('fee').value,
          'fee_ammount': Math.round(this.buyForm.get('fee_ammount').value * 100000000) / 100000000,
          'payment': this.buyForm.get('payment').value,
          'payment_name': this.buyPaymentTitle,
          'transaction_no': achFormData,
          'status': 0,
        };
        this.data.BuyCurrencyForAch(achData)
          .subscribe(res => {
            this.showBuyOrderStatusResponse = res;
            this.showBuyOrderStatus = true;
            this.showBuyDetails = false;
            this.achBuyFormConfirm = false;
            this.achInfo = JSON.parse(this.showBuyOrderStatusResponse.transaction_no);
          },
          errmess => { swal(errmess.statusText); this.achBuyFormConfirm = false; });
      }
    } else if (this.buyPaymentTitle == 'Western Union' || this.buyPaymentTitle == 'Wire' || this.buyPaymentTitle == 'Money Gram' || this.buyPaymentTitle == 'Ria' || this.buyPaymentTitle == 'Cash Deposit') {
      let id;
      let status;
      if (this.buyPaymentTitle == 'Western Union') {
        id = this.wuId;
        status = 0;
      } else if (this.buyPaymentTitle == 'Money Gram') {
        status = 0;
        id = this.mgId;
      } else if (this.buyPaymentTitle == 'Ria') {
        status = 0;
        id = this.riaId;
      } else if (this.buyPaymentTitle == 'Wire') {
        status = 0;
        id = this.wireId;
      } else {
        id = this.cashId;
        status = -1;
      }
      const data1 = {
        'address': this.coinAddress,
        'amount': this.buyForm.get('amount').value,
        'coin': this.buyForm.get('coin').value,
        'fee': this.buyForm.get('fee').value,
        'fee_ammount': Math.round(this.buyForm.get('fee_ammount').value * 100000000) / 100000000,
        'payment': this.buyForm.get('payment').value,
        'payment_name': this.buyPaymentTitle,
        'status': status,
        'transaction_no': id
      };
      this.data.BuyCurrency(data1)
        .subscribe((res: any) => {
          this.showBuyOrderStatusResponse = res;
          this.showBuyOrderStatus = true;
          this.showBuyDetails = false;
          this.achBuyFormConfirm = false;
          this.payment_name = res.payment_name;
          this.getCryptoResponse(res.id, res.payment_name);
        },
        errmess => { swal(errmess.statusText); this.achBuyFormConfirm = false; });
    } else {
      const data1 = {
        'address': this.coinAddress,
        'amount': this.buyForm.get('amount').value,
        'coin': this.buyForm.get('coin').value,
        'fee': this.buyForm.get('fee').value,
        'fee_ammount': Math.round(this.buyForm.get('fee_ammount').value * 100000000) / 100000000,
        'payment': this.buyForm.get('payment').value,
        'payment_name': this.buyPaymentTitle,
        'status': -1,
      };
      this.data.BuyCurrency(data1)
        .subscribe(res => {
          this.showBuyOrderStatusResponse = res;
          this.showBuyOrderStatus = true;
          this.showBuyDetails = false;
          this.achBuyFormConfirm = false;
        },
        errmess => { swal(errmess.statusText); this.achBuyFormConfirm = false; });
    }

  }


  // sell form functions goes here

  // initialize form 
  initSellForm = () => {
    this.sellForm = this.fb.group({
      address: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(this.positive), this.decimalValidator]],
      coin: ['', [Validators.required]],
      fee: [''],
      fee_ammount: ['', [Validators.required, Validators.pattern(this.positive), this.decimalValidator]],
      payment: ['', [Validators.required]]
    });
  }

  // currencyChange is called when some currency is selected.
  sellCurrencyChange(e) {
    if (e.target.value == 1) {
      this.sellCurrencySelected = 'Bitcoin';
      this.sellPaymentCurrencySelectedValue = this.btcCoinDetail.sell_price;
      this.sellChangeAmountOfCurrency(this.sellfee_ammount.value);
      this.sellForm.controls['address'].patchValue(this.sellAdminAddress(1));
    } else if (e.target.value == 2) {
      this.sellCurrencySelected = 'Ethereum';
      this.sellPaymentCurrencySelectedValue = this.ethCoinDetail.sell_price;
      this.sellChangeAmountOfCurrency(this.sellfee_ammount.value);
      this.sellForm.controls['address'].patchValue(this.sellAdminAddress(2));
    }
  }
  sellAdminAddress(id): string {
    for (let i = 0; i < this.PaymentAddresses.length; i++) {
      if (this.PaymentAddresses[i].id == id) {
        return this.PaymentAddresses[i].address;
      }
    }
  }
  // changeAmountOfCurrency is called when total amount is entered.
  sellChangeAmountOfCurrency(e) {
    const currencyAmount = e / this.sellPaymentCurrencySelectedValue;
    this.sellForm.controls['amount'].patchValue(currencyAmount);
  }

  // changeTotalAmount is called when amount of currency is entered.
  sellChangeTotalAmount(e) {
    const totalAmount = e * this.sellPaymentCurrencySelectedValue;
    this.sellForm.controls['fee_ammount'].patchValue(totalAmount);
  }

  get selladdress() { return this.sellForm.get('address'); }
  get sellamount() { return this.sellForm.get('amount'); }
  get sellcoin() { return this.sellForm.get('coin'); }
  get sellfee_ammount() { return this.sellForm.get('fee_ammount'); }
  get sellfee() { return this.sellForm.get('fee') }
  get sellpayment() { return this.sellForm.get('payment'); }

  sellNow() {
    this.sellFormConfirm = true;
    if (this.sellForm.valid) {
      this.showSellDetails = true;
    }
  }
  showSellOrderStatusResponse: any;
  showSellOrderStatus: boolean = false;
  wireInfo: any;
  ConfirmSell() {
    this.sellForm.controls['fee'].patchValue(this.sellPaymentCurrencySelectedValue);
    if (this.sellPaymentTitle == 'Wire') {

      if (this.wireSellForm.valid) {
        //run second function in service to update form
        var wireFormData = JSON.stringify({
          wireName: this.wireSellForm.get('wireName').value,
          wireAddress: this.wireSellForm.get('wireAddress').value,
          wireBankName: this.wireSellForm.get('wireBankName').value,
          wireBankRoutingNumber: this.wireSellForm.get('wireBankRoutingNumber').value,
          wireBankAddress: this.wireSellForm.get('wireBankAddress').value,
          wireBankSwiftCode: this.wireSellForm.get('wireBankSwiftCode').value,
          transaction_no: ''
        });
        const wireData = {
          'address': this.sellForm.get('address').value,
          'amount': this.sellForm.get('amount').value,
          'coin': this.sellForm.get('coin').value,
          'fee': this.sellForm.get('fee').value,
          'fee_ammount': Math.round(this.sellForm.get('fee_ammount').value * 100000000) / 100000000,
          'payment': this.sellForm.get('payment').value,
          'payment_name': this.sellPaymentTitle,
          'transaction_no': wireFormData,
          'status': -1
        };
        this.data.SellCurrency(wireData)
          .subscribe(res => {
            this.showSellOrderStatusResponse = res;
            this.showSellOrderStatus = true;
            this.showSellDetails = false;
            this.wireInfo = JSON.parse(this.showSellOrderStatusResponse.transaction_no);
          },
          errmess => { swal(errmess.statusText); });
      }
    } else if (this.sellPaymentTitle == 'Western Union') {
      const wu = {
        'address': this.sellForm.get('address').value,
        'amount': this.sellForm.get('amount').value,
        'coin': this.sellForm.get('coin').value,
        'fee': this.sellForm.get('fee').value,
        'fee_ammount': Math.round(this.sellForm.get('fee_ammount').value * 100000000) / 100000000,
        'payment': this.sellForm.get('payment').value,
        'payment_name': this.sellPaymentTitle,
        'status': -1,
        'wu': this.wuId
      };
      this.data.SellCurrency(wu)
        .subscribe(res => {
          this.showSellOrderStatusResponse = res;
          this.showSellOrderStatus = true;
          this.showSellDetails = false;
        },
        errmess => { swal(errmess.statusText); });
    }
    else {

      const wireData = {
        'address': this.sellForm.get('address').value,
        'amount': this.sellForm.get('amount').value,
        'coin': this.sellForm.get('coin').value,
        'fee': this.sellForm.get('fee').value,
        'fee_ammount': Math.round(this.sellForm.get('fee_ammount').value * 100000000) / 100000000,
        'payment': this.sellForm.get('payment').value,
        'payment_name': this.sellPaymentTitle,
        'status': -1,
      };
      this.data.SellCurrency(wireData)
        .subscribe(res => {
          this.showSellOrderStatusResponse = res;
          this.showSellOrderStatus = true;
          this.showSellDetails = false;
          this.wireInfo = JSON.parse(this.showSellOrderStatusResponse.transaction_no);
        },
        errmess => { swal(errmess.statusText); });
    }
  }


  //utilitty function to show title instead of id 
  //conversion from id to title of payment Method


  returnBuyPaymentTitle() {
    for (let i = 0; i < this.PaymentMethods.length; i++) {
      if (this.PaymentMethods[i].id == this.buyForm.get('payment').value) {
        this.buyPaymentTitle = this.PaymentMethods[i].title;
        return this.PaymentMethods[i].title;
      }
    }
  }
  sellPaymentTitle: string;
  returnSellPaymentTitle() {
    for (let i = 0; i < this.PaymentMethods.length; i++) {
      if (this.PaymentMethods[i].id == this.sellForm.get('payment').value) {
        this.sellPaymentTitle = this.PaymentMethods[i].title;
        return this.PaymentMethods[i].title;
      }
    }
  }

  //function to restore the original buy form
  BuyMore() {
    this.showBuyOrderStatus = false;
    this.buyFormConfirm = false;
    this.buyForm.reset();
  }
  SellMore() {
    this.showSellOrderStatus = false;
    this.sellFormConfirm = false;
    this.sellForm.reset();
  }

  //test form data
  testForm: FormGroup;
  positive = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  initializeTestForm() {
    this.testForm = this.fb.group({
      name1: ['', [Validators.required]],
      routing1: ['', [Validators.required, Validators.pattern(this.positive)]]
    });
  }
  get name1() { return this.testForm.get('name1'); }
  get routing1() { return this.testForm.get('routing1'); }

  //achBuyForm
  achBuyForm: FormGroup;
  initializeAchBuyForm() {
    this.achBuyForm = this.fb.group({
      achName: ['', [Validators.required]],
      achRoutingNumber: ['', [Validators.required, Validators.pattern(this.positive)]],
      achBankName: ['', [Validators.required]],
      achAccountNumber: ['', [Validators.required, Validators.pattern(this.positive)]]
    });
  }
  get achName1() { return this.achBuyForm.get('achName'); }
  get achRoutingNumber1() { return this.achBuyForm.get('achRoutingNumber'); }
  get achBankName1() { return this.achBuyForm.get('achBankName'); }
  get achAccountNumber1() { return this.achBuyForm.get('achAccountNumber'); }

  //wireSellForm
  wireSellForm: FormGroup;
  initializeWireSellForm() {
    this.wireSellForm = this.fb.group({
      wireName: ['', [Validators.required]],
      wireAddress: ['', [Validators.required]],
      wireBankName: ['', [Validators.required]],
      wireBankRoutingNumber: ['', [Validators.required]],
      wireBankAddress: ['', [Validators.required]],
      wireBankSwiftCode: ['', [Validators.required]],

    });
  }
  get wireName() { return this.wireSellForm.get('wireName'); }
  get wireAddress() { return this.wireSellForm.get('wireAddress'); }
  get wireBankName() { return this.wireSellForm.get('wireBankName'); }
  get wireBankRoutingNumber() { return this.wireSellForm.get('wireBankRoutingNumber'); }
  get wireBankAddress() { return this.wireSellForm.get('wireBankAddress'); }
  get wireBankSwiftCode() { return this.wireSellForm.get('wireBankSwiftCode'); }
  uploadBuyTrNoForm: FormGroup;
  initializeUploadBuyTrForm() {
    this.uploadBuyTrNoForm = this.fb.group({
      transaction_no: ['', [Validators.required]]
    });
  }



  get transaction_noWire() { return this.uploadBuyTrNoForm.get('transaction_no'); }
  trNoBoolean: boolean = false;
  trNoUploadResponse: any;
  UploadTransactionNumberForWURiaMoney() {
    this.trNoBoolean = true;
    if (this.uploadBuyTrNoForm.valid) {
      const data = {
        transaction_no: this.uploadBuyTrNoForm.get('transaction_no').value,
        status: 0
      }
      this.data.UpdateUserBuyTrNoForWURiaMoneyGram(this.showBuyOrderStatusResponse.id, data)
        .subscribe(res => {
          this.trNoUploadResponse = res;
          this.showBuyOrderStatusResponse.status = 0;
          this.trNoBoolean = false;
        },
        errmess => { swal(errmess.statusText); this.trNoBoolean = false; });
    }
  }
  detailsObj;
  keyArr;

  getCryptoResponse(buyId, paymentName) {
    this.data.getWuDetails(buyId, paymentName).subscribe((res: any) => {
      this.wuResponse = res;
      this.detailsObj = res.details;
      const keyArr = Object.keys;
      this.detailsObj = JSON.parse(this.detailsObj);
      this.keyArr = Object.keys(this.detailsObj);
      // this.keyArr.forEach(element => {
      // });
    });
  }

  saveIds() {
    this.cryptoDetails.forEach(element => {
      if (element.name == 'Western Union') {
        if (element.id) {
          this.wuId = parseInt(element.id);
        } else {
          this.spliceCrypto('Western Union');
        }
      }
      if (element.name == 'Wire') {
        if (element.id) {
          this.wireId = parseInt(element.id)
        } else {
          this.spliceCrypto('Wire');
        }
      }
      if (element.name == 'Ria') {
        if (element.id) {
          this.riaId = parseInt(element.id)
        } else {
          this.spliceCrypto('Ria');
        }
      }
      if (element.name == 'Money Gram') {
        if (element.id) {
          this.mgId = parseInt(element.id)
        } else {
          this.spliceCrypto('Money Gram');
        }
      }
      if (element.name == 'Cash Deposit') {
        if (element.id) {
          this.cashId = parseInt(element.id)
        } else {
          this.spliceCrypto('Cash Deposit');
        }
      }
    });
  }

  spliceCrypto(name) {
    this.PaymentMethods.forEach((element, i) => {
      if (element.title == name) {
        this.PaymentMethods.splice(i, 1);
      }
    });
  }

  UploadReceipt() {
    this.data.postReceipt(this.fileToUpload, this.showBuyOrderStatusResponse.id).subscribe(res => {
      console.log(res);
      swal('Cash Deposit Receipt added successfully')
    })
  }
  fileToUpload: any;
  handlefileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  //   validationDecimal(e){
  // console.log(e,"lmlk")
  //   }

  // ---------validator (decimal upto 8 only)---------------
  decimalValidator(control: FormControl) {
    if (control.value) {
      const string = JSON.stringify(control.value);
      if (string) {
        const split = string.split('.');
        if (split[1]) {
          if (split[1].length < 8) {
            return null;
          } else {
            return {
              decimal8: {
                parsedDomain: control.value
              }
            }
          }
        }
      }
    }
    return null;

  }
}
