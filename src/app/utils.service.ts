import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from './url';
import { Storage } from './class/storage';

@Injectable()
export class UtilsService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  saveProfilePicture(image: File) {

    const formFata: FormData = new FormData();
    formFata.append('image', image, image.name);
    

    return this._http.post(this.link.url + 'saveImageProfile' + this.token.getTokenUrl(), formFata)
    .map(data => data.json())
    .toPromise();

  }

  getConversation(search) {
    return this._http.post(this.link.url + 'chat/getConversation' + this.token.getTokenUrl(), search)
    .map(data => data.json())
    .toPromise();
  }

  createConversation(parameters) {
    return this._http.post(this.link.url + 'chat/createConversation' + this.token.getTokenUrl(), parameters)
    .map(data => data.json())
    .toPromise();
  }

  getMessages(parameters) {
    return this._http.post(this.link.url + 'chat/getMessages' + this.token.getTokenUrl(), parameters)
    .map(data => data.json())
    .toPromise();
  }

  sendMessage(message) {
    return this._http.post(this.link.url + 'chat/sentMessage' + this.token.getTokenUrl(), message)
    .map(data => data.json())
    .toPromise();
  }

}
