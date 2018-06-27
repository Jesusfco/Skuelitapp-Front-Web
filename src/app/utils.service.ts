declare const Pusher: any;
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import 'pusher-js';
import { Observable } from "rxjs";
import { Url } from './url';
import { Storage } from './class/storage';
import { environment } from './class/environment';

@Injectable()
export class UtilsService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  public pusher: any;
  public channel: any;

  constructor(private _http: Http) {

    

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });

   }

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

  getUndefinedContact(id) {
    return this._http.get(this.link.url + 'chat/undefinedContact/' + id + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  messageRead(conversation) {
    return this._http.post(this.link.url + 'chat/setMessagesRead' + this.token.getTokenUrl(), conversation)
    .map(data => data.json())
    .toPromise();
  }

}
