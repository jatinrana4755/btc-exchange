import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminDataService {
    constructor(private htttp: HttpClient, private http: Http) { }
    baseUrl = ' http://45.77.184.244:8000/base';

    // ----------------control panel-----------------------
    getCommisionFee(): Observable<any> {
        return this.htttp.get(`${this.baseUrl}/CommisionFee/`)
            .map(res => res)
            .catch(error => error);
    }

    putCommissionFee(buy, sell, id): Observable<any> {
        const hadata = {
            buy_fee: buy,
            sell_fee: sell,
        };
        return this.htttp.put(`${this.baseUrl}/FeeElement/${id}/`, hadata)
            .map(res => res)
            .catch(error => error);
    }


    // ------------------------payment methods-----------------------
    putPaymentMethod(title, status, id, buymethod, sellmethod): Observable<any> {
        const hadata = {
            is_active: status,
            title: title,
            buymethod: buymethod,
            sellmethod: sellmethod
        };
        return this.htttp.put(`${this.baseUrl}/PaymentElement/${id}/`, hadata)
            .map(res => res)
            .catch(error => error);
    }

    postPaymentMethod(data): Observable<any> {
        return this.htttp.post(this.baseUrl + '/PaymentMethod/', data)
            .map(res => res)
            .catch(error => error);
    }


    // ------------------------payment address---------------------

    putPaymentAddress(address, coin, id): Observable<any> {
        const hadata = {
            address: address,
            coin: coin
        };
        return this.htttp.put(this.baseUrl + '/AdminAddress/' + id + '/', hadata)

            .map(res => res)
            .catch(error => error);
    }


    // ---------------------Buy Orders---------------------------
    getBuyOrders(): Observable<any> {
        return this.htttp.get(this.baseUrl + '/Buy/')
            .map(res => res)
            .catch(error => error);
    }

    putBuyOrders(details, id): Observable<any> {
        return this.htttp.patch(`${this.baseUrl}/BuyElement/${id}/`, details)
            .map(res => res)
            .catch(error => error);
    }

    // -----------------------sell order--------------------------
    getSellOrders(): Observable<any> {
        return this.htttp.get(this.baseUrl + '/Sell/')
            .map(res => res)
            .catch(error => error);
    }

    putSellOrder(id: number, details: any): Observable<any> {
        return this.htttp.patch(this.baseUrl + '/SellElement/' + id + '/', details)
            .map(res => res)
            .catch(error => error);
    }


    // ------------------------KYC requests---------------------
    putKYC(is_verified, id): Observable<any> {
        const hadata = {
            is_verified: is_verified
        };
        return this.htttp.put(this.baseUrl + '/User_detail_element/' + id + '/', hadata)
            .map(res => res)
            .catch(error => error);
    }

    getKYC(): Observable<any> {
        return this.htttp.get(this.baseUrl + '/Verify_User/')
            .map(res => res)
            .catch(error => error);
    }


    // ---------------------expire time put ----------------------------
    putTime(data) {
        return this.htttp.put(`${this.baseUrl}/ExpireTime/`, data)
            .map(res => res)
            .catch(err => err);
    }


    // ----------------------- post western union details --------------------------
    postWUDetails(details, proof, cryptoName) {

        const formData = new FormData();
        formData.append('details', details);
        if (proof) {
            formData.append('proof', proof);
        }
        formData.append('status', 'true');
            return this.htttp.post(`${this.baseUrl}/${cryptoName}/`, formData)
                .map(res => res)
                .catch(err => err);
    }


    getWuDetails() {
            return this.htttp.get(`${this.baseUrl}/AllWesternUnion/`)
                .map(res => res)
                .catch(err => err);
    }

        getMgDetails() {
            return this.htttp.get(`${this.baseUrl}/AllMoneyGram/`)
                .map(res => res)
                .catch(err => err);
    }

        getWireDetails() {
            return this.htttp.get(`${this.baseUrl}/AllWire/`)
                .map(res => res)
                .catch(err => err);
    }

        getRiaDetails() {
            return this.htttp.get(`${this.baseUrl}/AllRia/`)
                .map(res => res)
                .catch(err => err);
    }

    getCryptoDetails(name){
        return this.htttp.get(`${this.baseUrl}/All${name}/`)
                .map(res => res)
                .catch(err => err);
    }

    editCryptodetails(name, status, id){
        const data = {
            'status': status
        }
        return this.htttp.put(`${this.baseUrl}/${name}/?id=${id}`, data)
                .map(res => res)
                .catch(err => err); 
    }

    

}

