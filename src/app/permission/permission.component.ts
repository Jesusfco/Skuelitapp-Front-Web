import { Component, OnInit } from '@angular/core';
import { PermissionRequest } from '../class/PermissionRequest';
import { PermissionService } from './permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  public permissions: Array<PermissionRequest> = [];
  public request: number = 0;
  public updatePermissionObserver: any;

  constructor(private _http: PermissionService) {
    this.setPermission();
    this.setUpdatePermissionObserver();
   }

  ngOnInit() {
  }

  setPermission() {
    this.request++;
    this._http.getPermissions(5456).then(

      data => {

        this.permissions = [];

        for(let d of data) {

          let x: PermissionRequest = new PermissionRequest();
          x.setData(d);
          this.permissions.push(x);

        }

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );
  }

  setUpdatePermissionObserver() {
    this.updatePermissionObserver = setInterval(() =>  this.logicUpdatePermissionObserver(), 1000);
  }

  logicUpdatePermissionObserver() {

    if(sessionStorage.getItem('updatePermission') == undefined) return;

    let data = JSON.parse(sessionStorage.getItem('updatePermission'));

    let x = new PermissionRequest();
    x.setData(data);

    for(let i = 0; i < this.permissions.length; i++) {
      if(this.permissions[i].id == x.id) {
        this.permissions[i].confirmed = x.confirmed;
        break;
      }
    }
    
    sessionStorage.removeItem('updatePermission');

  }

}
