import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class PeriodService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  private subject = new Subject<any>();
  
  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(message: any) {
    this.subject.next(message);
  }

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

  showPeriod(id) {
    return this._http.get(this.link.url + 'period/' + id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  updatePeriod(period) {
    return this._http.post(this.link.url + 'period/update' + this.token.getTokenUrl(), period)
      .map(data => data.json())
      .toPromise();
  }

  getPeriodType() {
    return this._http.get(this.link.url + 'periodType' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  getSchoolLevels() {
    return this._http.get(this.link.url + 'schoolLevels' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  checkDelete(period) {
    return this._http.post(this.link.url + 'period/checkDelete' + this.token.getTokenUrl(), period)
      .map(data => data.json())
      .toPromise();
  }

  delete(period) {
    return this._http.delete(this.link.url + 'period/delete/' + period.id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

}
