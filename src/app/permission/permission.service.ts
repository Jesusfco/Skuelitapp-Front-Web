import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class PermissionService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getPermissions(parameters) {
    return this._http.post(this.link.url + 'permission/getPermissions' + this.token.getTokenUrl(), parameters)
    .map(data => data.json())
    .toPromise();
  }

  showPermission(permission) {
    return this._http.post(this.link.url + 'permission/show' + this.token.getTokenUrl(), permission)
    .map(data => data.json())
    .toPromise();
  }

  validate(permission) {
    return this._http.post(this.link.url + 'permission/validate' + this.token.getTokenUrl(), permission)
    .map(data => data.json())
    .toPromise();
  }

  negate(permission) {
    return this._http.post(this.link.url + 'permission/negate' + this.token.getTokenUrl(), permission)
    .map(data => data.json())
    .toPromise();
  }

} 
