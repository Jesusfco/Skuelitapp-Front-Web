import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class ReceiptService {

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

  getReceipts(parameters) {
    return this._http.post(this.link.url + 'receipts/get' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  sugestUser(user) {
    return this._http.post(this.link.url + 'receipts/sugestUser' + this.token.getTokenUrl(), user)
      .map(data => data.json())
      .toPromise();
  }

  getStudentById(id) {
    return this._http.get(this.link.url + 'receipts/getStudentById/' + id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

}
