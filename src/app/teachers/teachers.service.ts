import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class TeachersService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getSchedule() {
    return this._http.get(this.link.url + 'teachers/mySchedule' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

}
