import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class UserService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getUsers(parameters) {
    return this._http.post(this.link.url + 'user/search' + this.token.getTokenUrl(), parameters)
          .map(data => data.json())
          .toPromise();
  }

  checkUniqueEmail(data){
    return this._http.post(this.link.url + 'user/uniqueEmail' + this.token.getTokenUrl(), {email: data})
      .map(data => data.json())
      .toPromise();
  }

  getSchoolLevels() {
    return this._http.get(this.link.url + 'schoolLevels' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  getGroups(user) {
    return this._http.post(this.link.url + 'user/posibleGroups' + this.token.getTokenUrl(), user)
    .map(data => data.json())
    .toPromise();
  }

  getPosiblePayment(parameters) {
    return this._http.post(this.link.url + 'user/posiblePayments' + this.token.getTokenUrl(), parameters)
    .map(data => data.json())
    .toPromise();
  }

  storeUser(dataJson) {
    return this._http.post(this.link.url + 'user/store' + this.token.getTokenUrl(), dataJson)
            .map(data => data.json())
            .toPromise();
  }

  showUser(user) {
    return this._http.get(this.link.url + 'user/show/' + user.id + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

  updateUser(parameters){
    return this._http.post(this.link.url + 'user/update' + this.token.getTokenUrl(), parameters)
            .map(data => data.json())
            .toPromise();
  }

  getChildren(parameters) {
    return this._http.post(this.link.url + 'user/getChildren' + this.token.getTokenUrl(), parameters)
            .map(data => data.json())
            .toPromise();
  }

}
