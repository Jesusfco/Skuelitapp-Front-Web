import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class PeriodService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getPeriods(parameters) {
    return this._http.post(this.link.url + 'period/get' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  storePeriod(period) {
    return this._http.post(this.link.url + 'period/create' + this.token.getTokenUrl(), period)
      .map(data => data.json())
      .toPromise();
  }

}
