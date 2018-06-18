import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class ParentsService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getSchedule(id) {
    return this._http.get(this.link.url + 'parents/mySchedule/' + id + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  getChildrens() {
    return this._http.get(this.link.url + 'parents/myChildren' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }
  
  createPermission(permission) {
    return this._http.post(this.link.url + 'parents/permission/create' + this.token.getTokenUrl(), permission)
      .map(data => data.json())
      .toPromise();
  }

  savePermissionImage(image: File, id) { 

    const formFata: FormData = new FormData();
    formFata.append('image', image, image.name);
    formFata.append('id', id);

    return this._http.post(this.link.url + 'parents/permission/storeImage' + this.token.getTokenUrl(), formFata)
    .map(data => data.json())
    .toPromise();
  }

  getPermissions(select) {
    return this._http.post(this.link.url + 'parents/permission/getPermissions' + this.token.getTokenUrl(), {user_id: select})
    .map(data => data.json())
    .toPromise();
  }

  showPermission(permission) {
    return this._http.post(this.link.url + 'parents/permission/show' + this.token.getTokenUrl(), permission)
    .map(data => data.json())
    .toPromise();
  
  }

}
