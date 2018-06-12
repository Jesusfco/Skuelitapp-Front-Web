import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class SubjectService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getSubjects(parameters) {
    return this._http.post(this.link.url + 'subjects/get' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  getLevels() {
    return this._http.get(this.link.url + 'groups/getLevels' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  storeSubject(subject) {
    return this._http.post(this.link.url + 'subjects/store' + this.token.getTokenUrl(), subject)
      .map(data => data.json())
      .toPromise();
  }

  deleteSub(subject) {
    return this._http.delete(this.link.url + 'subjects/delete/' + subject.id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }
}
