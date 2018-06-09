import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class PaymentService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  get(parameters) {
    return this._http.post(this.link.url + 'payment/get' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  periods() {
    return this._http.post(this.link.url + 'payment/periods' + this.token.getTokenUrl(), 1)
      .map(data => data.json())
      .toPromise();
  }


  show(id) {
    return this._http.get(this.link.url + 'payment/' + id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  store(payment) {
    return this._http.post(this.link.url + 'payment/store' + this.token.getTokenUrl(), payment)
      .map(data => data.json())
      .toPromise();
  }

  update(payment) {
    return this._http.post(this.link.url + 'payment/update' + this.token.getTokenUrl(), payment)
      .map(data => data.json())
      .toPromise();
  }

  getDatesPayment(parameters) {
    return this._http.post(this.link.url + 'payment/datesPayment' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  postPaymentDates(dates) {
    return this._http.post(this.link.url + 'payment/storePaymentDates' + this.token.getTokenUrl(), dates)
    .map(data => data.json())
    .toPromise();
  }
  
  getPeriodType() {
    return this._http.get(this.link.url + 'periodType' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

}
