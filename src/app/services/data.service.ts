import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CoinDetail } from '../shared/coindetail';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import { stat } from 'fs';
@Injectable()
export class DataService {

      baseUrl = 'http://45.77.184.244:8000/base';

      constructor(private htttp: HttpClient, private http: Http) { }

      Coindetail(coin: string): Observable<any> {
            const hadata = { coin: coin };
            return this.http.post(this.baseUrl + '/Coindetail/', hadata)
                  .map(res => {
                        return res.json();
                  })
                  .catch(error => error);
      }

      UserBuy(username: string): Observable<any> {
            const hadata = { user: username };
            return this.htttp.post(this.baseUrl + '/UserBuy/', hadata)
                  .map(res => res)
                  .catch(error => error);
      }

      UserSell(username: string): Observable<any> {
            const hadata = { user: username };
            return this.htttp.post(this.baseUrl + '/UserSell/', hadata)
                  .map(res => res)
                  .catch(error => error);
      }


      UpdateUserBuyTrNo(id: number, tr_no: number): Observable<any> {
            const hadata = { transaction_no: tr_no };
            return this.htttp.patch(this.baseUrl + '/BuyElement/' + id + '/', hadata)
                  .map(res => res)
                  .catch(error => error);


      }
      UpdateUserBuyTrNoForWURiaMoneyGram(id: number, data): Observable<any> {
            return this.htttp.patch(this.baseUrl + '/BuyElement/' + id + '/', data)
                  .map(res => res)
                  .catch(error => error);

      }

      BuyCurrency(hadata) {
            return this.htttp.post(this.baseUrl + '/Buy/', hadata)
                  .map(res => res)
      }
      BuyCurrencyForAch(hadata) {
            return this.htttp.post(this.baseUrl + '/Buy/', hadata)
                  .map(res => res)
      }


      SellCurrency(hadata) {
            return this.htttp.post(this.baseUrl + '/Sell/', hadata)
                  .map(res => res)
      }

      UpdateUserSellTrNoForWire(id: number, name: string, address: string, bankname: string,
            bankrouting: string, number: string, bankaddress: string, bankswiftcode: string): Observable<any> {
            const data = JSON.stringify({
                  name: name,
                  address: address,
                  bankName: bankname,
                  bankBankRouting: bankrouting,
                  number: number,
                  bankAddress: bankaddress,
                  bankSwiftCode: bankswiftcode
            });
            return this.htttp.patch(this.baseUrl + '/SellElement/' + id + '/', data)
                  .map(res => res)
                  .catch(error => error);

      }



      UploadKYC(fileToUpload: File): Observable<any> {
            const formData: FormData = new FormData();
            formData.append('image_url', fileToUpload);
            return this.htttp.put(this.baseUrl + '/uploadKYC/', formData)
                  .map(res => res)
                  .catch(error => error);

      }

      changePasswordRequest(old_password, new_password): Observable<any> {
            const hadata = {
                  old_password: old_password,
                  new_password: new_password
            };
            return this.htttp.put(this.baseUrl + '/ChangePassword/', hadata)
                  .map(res => res)
                  .catch(error => error);
      }

      // public logout(): Observable<any> {
      //       return this.htttp.get(`${this.baseUrl}/Logout`);

      // }

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

      // shared methods between admin and client

      getPaymentMethods(): Observable<any> {
            return this.htttp.get(this.baseUrl + '/PaymentMethod/')
                  .map(res => res)
                  .catch(error => error);

      }

      getPaymentAddresses(): Observable<any> {
            return this.htttp.get(this.baseUrl + '/AdminAddress/')
                  .map(res => res)
                  .catch(error => error);

      }

      // get western union details by sending buy_id
      getWuDetails(id, paymentName) {
            if (paymentName == 'Western Union') {
                  return this.http.get(`${this.baseUrl}/WesternUnion/?buy_id=${id}`)
                        .map(res => res.json())
                        .catch(err => err);
            } else if (paymentName == 'Wire') {
                  return this.http.get(`${this.baseUrl}/Wire/?buy_id=${id}`)
                        .map(res => res.json())
                        .catch(err => err);
            } else if (paymentName == 'Ria') {
                  return this.http.get(`${this.baseUrl}/Ria/?buy_id=${id}`)
                        .map(res => res.json())
                        .catch(err => err);
            } else if (paymentName == 'Money Gram') {
                  return this.http.get(`${this.baseUrl}/MoneyGram/?buy_id=${id}`)
                        .map(res => res.json())
                        .catch(err => err);
            } else if( paymentName == 'Cash Deposit'){
                  return this.http.get(`${this.baseUrl}/CashDeposit/?buy_id=${id}`)
                        .map(res => res.json())
                        .catch(err => err);
            }
      }

      postReceipt(data: File, id){
            const formData = new FormData();
            formData.append('receipt', data);
            formData.append('status', '0');
            return this.htttp.patch(`${this.baseUrl}/BuyElement/${id}/`, formData)
                  .catch(err => err);
      }


}
