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

}
