import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class GroupService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getGroups(parameters) {
    return this._http.post(this.link.url + 'groups/getGroups' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  getPeriods() {
    return this._http.get(this.link.url + 'groups/getPeriods' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  getLevels() {
    return this._http.get(this.link.url + 'groups/getLevels' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

}
