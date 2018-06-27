import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class StudentsService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getSchedule() {
    return this._http.get(this.link.url + 'students/mySchedule' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  searchConversation(search) {
    return this._http.post(this.link.url + 'students/searchConversations' + this.token.getTokenUrl(), search)
    .map(data => data.json())
    .toPromise();
  }

}
