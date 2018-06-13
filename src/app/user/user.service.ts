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

}
